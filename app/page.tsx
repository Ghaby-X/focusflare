import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-2xl mx-4 text-center">
        <div className="flex justify-center mb-6">
          <Clock size={48} className="text-orange-500" />
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Focus Flare
        </h1>

        <p className="text-lg text-slate-600 mb-6">
          A simple yet powerful Pomodoro timer to boost your productivity and maintain a healthy work-life balance.
        </p>

        <div className="space-y-4 text-slate-700">
          <p>
            Focus Flare helps you break your work into focused 25-minute intervals,
            followed by short breaks. This technique, known as the Pomodoro Technique,
            is proven to enhance concentration and reduce mental fatigue.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="space-y-2 text-left list-disc list-inside">
              <li>Customizable work and break intervals</li>
              <li>Clean, distraction-free interface</li>
              <li>Gentle notification sounds</li>
              <li>Track your daily focus sessions</li>
            </ul>
          </div>
        </div>

        <Link href={'/timer'}>
          <Button variant={'secondary'} className='mt-4'>timer</Button>
        </Link>
      </div>
    </div>
  );
}
