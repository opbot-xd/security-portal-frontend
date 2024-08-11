import { useNavigate } from 'react-router-dom';
import Drawer from '@/components/ui/Drawer';

// Define the common Tailwind CSS class directly
const commonBoxClasses = 'flex text-xl font-sans justify-center items-center h-40 w-80 bg-zinc-950 rounded-xl text-white cursor-pointer';

type RouteMapKey = 'Student' | 'Faculty' | 'Temporary Faculty' | 'Faculty Family members';

const EnrollPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (text: RouteMapKey) => {
    // Mapping text to specific routes
    const routeMap: Record<RouteMapKey, string> = {
      Student: 'student',
      Faculty: 'faculty',
      'Temporary Faculty': 'temporary-faculty',
      'Faculty Family members': 'faculty-family'
    };
    
    // Navigate to the route based on the text
    navigate(`/enroll/${routeMap[text]}`);
  };

  return (
    <div className="flex flex-col gap-40 bg-slate-900 justify-center items-center h-screen">
      <Drawer />
      <div className="flex gap-40">
        <div
          onClick={() => handleNavigation('Student')}
          className={commonBoxClasses}
        >
          Student
        </div>
        <div
          onClick={() => handleNavigation('Faculty')}
          className={commonBoxClasses}
        >
          Faculty
        </div>
      </div>
      <div className="flex gap-40">
        <div
          onClick={() => handleNavigation('Temporary Faculty')}
          className={commonBoxClasses}
        >
          Temporary Faculty
        </div>
        <div
          onClick={() => handleNavigation('Faculty Family members')}
          className={commonBoxClasses}
        >
          Faculty Family members
        </div>
      </div>
    </div>
  );
}

export default EnrollPage;
