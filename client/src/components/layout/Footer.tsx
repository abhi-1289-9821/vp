import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck, Globe, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123B5D] text-slate-300 text-xs border-t-2 border-[#E8B84A] mt-16">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Institutional Identity */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1B4D78] border border-[#E8B84A] text-white flex items-center justify-center font-bold text-base">
              स
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight">SAHAAY</span>
              <p className="text-[10px] text-slate-300 leading-tight">
                Citizen Land Acquisition Platform
              </p>
            </div>
          </div>

          <p className="text-slate-300 text-xs leading-relaxed">
            "Your Land. Your Case. Your Information."
            <br />
            A public-service companion providing transparent tracking, cadastral GIS mapping, statutory compensation calculations, and discrepancy detection.
          </p>

          <div className="pt-1 text-[11px] text-[#E8B84A] font-semibold">
            Toll-Free Citizen Helpline: 1800-180-LAND (5263)
          </div>
        </div>

        {/* Col 2: Citizen Services */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            Citizen Services
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>
              <Link to="/find-land" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Find My Land Records</span>
              </Link>
            </li>
            <li>
              <Link to="/documents/analyze" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Understand Documents (AI)</span>
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Cadastral GIS Spatial Portal</span>
              </Link>
            </li>
            <li>
              <Link to="/compensation" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Compensation & 100% Solatium</span>
              </Link>
            </li>
            <li>
              <Link to="/actions" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Citizen Action Center</span>
              </Link>
            </li>
            <li>
              <Link to="/grievance" className="hover:text-[#E8B84A] transition flex items-center gap-1">
                <span>• Section 15 Grievances & Objections</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Statutory Framework */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            Statutory Framework
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li>
              <span className="text-slate-200 font-semibold">• RFCTLARR Act, 2013</span>
            </li>
            <li>
              <span className="text-slate-200">• Section 11(1) Preliminary Notification</span>
            </li>
            <li>
              <span className="text-slate-200">• Section 15 Hearing of Objections</span>
            </li>
            <li>
              <span className="text-slate-200">• Section 19 Declaration of Acquisition</span>
            </li>
            <li>
              <span className="text-slate-200">• Section 23/30 Award & Solatium</span>
            </li>
            <li>
              <span className="text-slate-200">• PFMS Direct Benefit Transfer</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Public Administration Support */}
        <div className="space-y-2.5">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-[#1B4D78] pb-1.5">
            Citizen Assistance
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#E8B84A] shrink-0 mt-0.5" />
              <span>State Land Acquisition Directorate, Revenue Complex, Bhopal, MP - 462001</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <span>National Toll-Free: 1800-180-5263</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#E8B84A] shrink-0" />
              <span>support@sahaay.gov.demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Compliance & Disclaimer Bar */}
      <div className="bg-[#0C2840] border-t border-[#1B4D78] py-3 text-center text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © 2026 SAHAAY • Designed for Citizen Land Acquisition Transparency & Assistance
          </span>
          <span className="text-[#E8B84A] font-medium">
            Standard Prototype Demonstration
          </span>
        </div>
      </div>
    </footer>
  );
};
