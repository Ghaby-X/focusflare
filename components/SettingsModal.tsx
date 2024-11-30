import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

const SettingsModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer">settings</div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Configure settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-row min-h-40 h-full">
                    <div className="px-2">
                        hello
                    </div>
                    <div className="h-full w-[2px] bg-black"></div>
                    <div className="px-2">
                        hello
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SettingsModal