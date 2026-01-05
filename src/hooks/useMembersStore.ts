import { useCallback, useEffect, useMemo, useState } from "react";

import { Member } from "@/types/member";
import { mockMembers } from "@/data/mockMembers";

const STORAGE_KEY = "members_v1";

function reviveMemberDates(members: Member[]): Member[] {
  return members.map((m) => ({
    ...m,
    createdAt: m.createdAt ? new Date(m.createdAt as unknown as string) : new Date(),
  }));
}

function loadMembers(): Member[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockMembers;
    const parsed = JSON.parse(raw) as Member[];
    if (!Array.isArray(parsed)) return mockMembers;
    return reviveMemberDates(parsed);
  } catch {
    return mockMembers;
  }
}

function persistMembers(members: Member[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
}

export function useMembersStore() {
  const [members, setMembers] = useState<Member[]>(() => loadMembers());

  // Seed storage on first run (or when storage was empty)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) persistMembers(members);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      persistMembers(members);
    } catch {
      // ignore
    }
  }, [members]);

  // Keep tabs/windows in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      setMembers(loadMembers());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addMember = useCallback((member: Omit<Member, "id" | "createdAt">) => {
    const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now().toString();
    const newMember: Member = { ...member, id, createdAt: new Date() };
    setMembers((prev) => [...prev, newMember]);
    return newMember;
  }, []);

  const updateMember = useCallback((id: string, patch: Partial<Omit<Member, "id">>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const toggleVisibility = useCallback((id: string) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, isVisible: !m.isVisible } : m)));
  }, []);

  const stats = useMemo(() => {
    return {
      كبار: members.filter((m) => m.section === "كبار مجال الشير").length,
      نجوم: members.filter((m) => m.section === "نجوم الشير").length,
      بتوع: members.filter((m) => m.section === "بتوع الشير").length,
    };
  }, [members]);

  return { members, setMembers, addMember, updateMember, deleteMember, toggleVisibility, stats };
}
