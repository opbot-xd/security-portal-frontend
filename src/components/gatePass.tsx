import { useNavigate } from 'react-router-dom';
import Drawer from '@/components/ui/Drawer';
import { BottomGradient } from '@/components/ui/BottomGradient';

// Define the common Tailwind CSS class directly
const commonBoxClasses = 'flex text-xl font-sans justify-center items-center h-40 w-80 bg-zinc-950 rounded-xl text-white cursor-pointer';

type RouteMapKey = 'Request' | 'View' | 'Approve';

const GatePassPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (text: RouteMapKey) => {
    // Mapping text to specific routes
    const routeMap: Record<RouteMapKey, string> = {
      Request: 'request',
      View: 'view-pass',
      Approve: 'approve-pass',
    };
    
    // Navigate to the route based on the text
    navigate(`/gate-pass/${routeMap[text]}`);
  };

  return (
    <div className="flex flex-col gap-28 bg-slate-900 justify-center items-center h-screen">
      <Drawer />
      <div className="flex gap-28">
        <div
          onClick={() => handleNavigation('Request')}
          className={commonBoxClasses}
        >
          Request for a Gate Pass
          <BottomGradient />
        </div>
        <div
          onClick={() => handleNavigation('View')}
          className={commonBoxClasses}
        >
          View Gate Pass Request
          <BottomGradient />
        </div>
      </div>
      <div className="flex gap-40">
        <div
          onClick={() => handleNavigation('Approve')}
          className={commonBoxClasses}
        >
          Approve/Reject Gate Pass
          <BottomGradient />
        </div>
      </div>
    </div>
  );
}

export default GatePassPage;
