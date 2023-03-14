import { SafeUrl } from "@angular/platform-browser";

export interface Etape {
    id?: string;
    description?: string;
    imgUrl?: SafeUrl;
    vidUrl?: SafeUrl;
    file?: any;
}