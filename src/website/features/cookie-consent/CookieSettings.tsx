// CookieSettings.jsx

import { ToggleWithIcon } from "@/components/ui/input/switch";
import { ConsentKeys, CookieKeys } from "./CookieConsentBanner";
// import Modal from '../modal/SimpleModal';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/website/features/dialog/dialog";
import { Button } from "@/components/ui/button";

interface CookieSettingsProps {
  consent: Record<ConsentKeys, boolean>;
  onSave: () => void;
  onReset: () => void;
  onConsentChange: (segment: CookieKeys, newValue: boolean) => void;
  children: React.ReactNode;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({
  consent,
  onSave,
  onReset,
  onConsentChange,
  children,
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bewerk Cookie voorkeur</DialogTitle>
            <DialogDescription>
              Hier kan je aangeven welke cookies je wilt accepteren.
            </DialogDescription>
          </DialogHeader>
          <div>
            {(["marketing", "analytics", "statistics"] as ConsentKeys[]).map(
              (type) => (
                <div
                  key={type}
                  className="flex flex-row gap-2 items-center mb-2"
                >
                  <ToggleWithIcon
                    checked={consent[type]}
                    onChange={(value) => onConsentChange(type, value)}
                  />
                  <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
              ),
            )}
          </div>
          <DialogFooter>
            {/* <Button type="submit">Save changes</Button> */}
            <Button onClick={onSave}>Opslaan</Button>
            <Button onClick={onReset}>Reset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieSettings;
