import { Inter } from "next/font/google";
import { Poppins } from "next/font/google"


export const interFont = Inter({ subsets: ['latin'] });
export const poppinsFont = Poppins({
    style: 'normal',
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']


});
