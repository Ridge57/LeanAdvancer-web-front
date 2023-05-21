import { SafeUrl } from "@angular/platform-browser";

export interface Etape {
    id?: string;
    index?: string;
    description?: string;
    imgUrl?: SafeUrl;
    vidUrl?: SafeUrl;
    fileLink?: string;
    file?: any;
}