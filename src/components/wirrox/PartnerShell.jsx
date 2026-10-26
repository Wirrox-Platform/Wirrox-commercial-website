import Navbar from './Navbar';
import Footer from './Footer';

export default function PartnerShell({children}) {
  return <div className="min-h-screen bg-canvas text-ink"><Navbar /><main className="pt-28 lg:pt-40 pb-24">{children}</main><Footer /></div>;
}
