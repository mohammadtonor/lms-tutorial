import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';

export const MobileSidebar = () => {
    return ( 
        <Sheet>
            <SheetTrigger  className='md:hidden pr-4 hover:opacity-70 transition'>
                <Menu />
            </SheetTrigger> 
        </Sheet>
    );
}
 