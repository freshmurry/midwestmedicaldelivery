import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const inquirySchema = z.object({
  facilityType: z.string().min(1, 'Facility type is required'),
  facilityName: z.string().min(2, 'Facility name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  serviceNeeded: z.string().min(1, 'Service type is required'),
  message: z.string().optional(),
});
type InquiryFormValues = z.infer<typeof inquirySchema>;
function InquiryFormContent({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      facilityType: '',
      serviceNeeded: '',
    }
  });
  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await new Promise(resolve => setTimeout(resolve, 600));
        onSuccess();
        reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please use our contact form or try again shortly for immediate dispatch assistance.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="facilityType" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Facility Type</Label>
          <Select name="facilityType" onValueChange={(val) => setValue('facilityType', val, { shouldValidate: true })}>
            <SelectTrigger className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Dental Office">Dental Office</SelectItem>
              <SelectItem value="Pharmacy">Pharmacy</SelectItem>
              <SelectItem value="Vet Clinic">Vet Clinic</SelectItem>
              <SelectItem value="Medical Supply Store">Medical Supply Store</SelectItem>
              <SelectItem value="Outpatient Clinic">Outpatient Clinic</SelectItem>
              <SelectItem value="Other Small Facility">Other Small Facility</SelectItem>
            </SelectContent>
          </Select>
          {errors.facilityType && <p className="text-[10px] text-red-500 font-bold">{errors.facilityType.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="facilityName" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Facility Name</Label>
          <Input id="facilityName" {...register('facilityName')} placeholder="Midwest Dental Lab" className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal" />
          {errors.facilityName && <p className="text-[10px] text-red-500 font-bold">{errors.facilityName.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contactName" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Contact Name</Label>
        <Input id="contactName" {...register('contactName')} placeholder="Contact Person" className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal" />
        {errors.contactName && <p className="text-[10px] text-red-500 font-bold">{errors.contactName.message}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Phone</Label>
          <Input id="phone" type="tel" {...register('phone')} placeholder="(XXX) XXX-XXXX" className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal" />
          {errors.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Email</Label>
          <Input id="email" type="email" {...register('email')} placeholder="office@facility.com" className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal" />
          {errors.email && <p className="text-[10px] text-red-500 font-bold">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="serviceNeeded" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Service Needed</Label>
        <Select name="serviceNeeded" onValueChange={(val) => setValue('serviceNeeded', val, { shouldValidate: true })}>
          <SelectTrigger className="bg-mmc-light border-0 rounded-xl py-5 h-auto focus:ring-2 focus:ring-mmc-teal">
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="Prescription Delivery">Prescription Delivery</SelectItem>
            <SelectItem value="Dental Prosthetics/Molds">Dental Prosthetics/Molds</SelectItem>
            <SelectItem value="Small Medical Supplies">Small Medical Supplies</SelectItem>
            <SelectItem value="Vet Clinic Transport">Vet Clinic Transport</SelectItem>
            <SelectItem value="STAT Small Parcel">STAT Small Parcel</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.serviceNeeded && <p className="text-[10px] text-red-500 font-bold">{errors.serviceNeeded.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message" className="font-bold text-mmc-dark text-xs uppercase tracking-wider">Small Parcel Details</Label>
        <Textarea id="message" {...register('message')} placeholder="Specify items (e.g. 5 Rx bags, 1 dental box)..." className="bg-mmc-light border-0 rounded-xl min-h-[80px] focus:ring-2 focus:ring-mmc-teal" />
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl py-7 text-lg font-bold shadow-airbnb mt-2 focus-visible:ring-offset-2">
        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Dispatching Unit...</> : 'Send Clinic Inquiry'}
      </Button>
    </form>
  );
}
export function QuickInquiryModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const handleSuccess = () => setIsSuccess(true);
  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setIsSuccess(false), 300);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setIsSuccess(false), 300);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? <Button className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl focus-visible:ring-2 ring-offset-2 ring-mmc-teal">Clinic Inquiry</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[95vh] overflow-y-auto rounded-3xl p-6 md:p-10 border-none shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DialogHeader className="mb-6 text-left">
                <DialogTitle className="text-2xl md:text-3xl font-black text-mmc-dark tracking-tight">
                  Inquiry for <span className="text-mmc-teal">Providers</span>
                </DialogTitle>
                <DialogDescription className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Fill out this form to submit a quick inquiry for your clinic's small parcel courier needs. Our team will respond promptly with dispatch options.
                </DialogDescription>
              </DialogHeader>
              <InquiryFormContent onSuccess={handleSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-mmc-teal/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="h-10 w-10 text-mmc-teal" />
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-mmc-dark">Request Logged!</h2>
                <DialogDescription className="text-mmc-gray text-lg max-w-xs mx-auto">
                  Our small-parcel dispatch team has assigned your request to a professional courier unit. Expect a follow-up shortly.
                </DialogDescription>
              </div>
              <Button onClick={handleClose} variant="outline" className="rounded-xl px-10 border-mmc-teal text-mmc-teal hover:bg-mmc-teal hover:text-white transition-all focus-visible:ring-2 ring-mmc-teal">
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}