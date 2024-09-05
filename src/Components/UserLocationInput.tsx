import AsciiArt from './AsciiArt';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import boomhauer from '../assets/images/boomhauer.jpg';

const UserLocationInput = () => {
  return (
    <div>
      <CardHeader>
        <h1 className='font-bold uppercase'>UserLocationInput</h1>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <AsciiArt src={boomhauer} height={256} width={256} fontSize={0.3} />
      </CardFooter>
    </div>
  );
};

export default UserLocationInput;
