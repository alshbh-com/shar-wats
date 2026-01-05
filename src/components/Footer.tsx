import { MessageCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border/50 bg-card/50">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Developer Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-muted-foreground">المطوّر</p>
            <p className="text-xl font-bold text-gradient-purple">الشبح</p>
            <a
              href="https://wa.me/201278006248"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-2 rounded-full transition-colors mt-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">01278006248</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-3">
            <Link 
              to="/terms" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">الشروط والأحكام</span>
            </Link>
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              لوحة التحكم
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} كبار مجال الشير
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
