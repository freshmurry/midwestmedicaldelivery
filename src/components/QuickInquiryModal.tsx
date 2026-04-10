import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
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
export function QuickInquiryModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
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
        toast.success('Inquiry sent!', {
          description: "We'll respond within 1 hour.",
        });
        reset();
        setOpen(false);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: 'Please call us directly for immediate assistance.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl">
            Quick Inquiry
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-black text-mmc-dark">
            Quick Inquiry for <span className="text-mmc-teal">Medical Providers</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="facilityType" className="font-bold text-mmc-dark">Facility Type</Label>
              <Select onValueChange={(val) => setValue('facilityType', val)}>
                <SelectTrigger className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Medical Facility">Medical Facility</SelectItem>
                  <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="Dental Office">Dental Office</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.facilityType && <p className="text-xs text-red-500 font-bold">{errors.facilityType.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="facilityName" className="font-bold text-mmc-dark">Facility Name</Label>
              <Input
                id="facilityName"
                {...register('facilityName')}
                placeholder="Community Hospital"
                className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal"
              />
              {errors.facilityName && <p className="text-xs text-red-500 font-bold">{errors.facilityName.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactName" className="font-bold text-mmc-dark">Contact Name</Label>
            <Input
              id="contactName"
              {...register('contactName')}
              placeholder="Dr. Jane Smith"
              className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal"
            />
            {errors.contactName && <p className="text-xs text-red-500 font-bold">{errors.contactName.message}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold text-mmc-dark">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="(219) 555-0123"
                className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal"
              />
              {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold text-mmc-dark">Email Address</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="contact@facility.com"
                className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal"
              />
              {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceNeeded" className="font-bold text-mmc-dark">Service Needed</Label>
            <Select onValueChange={(val) => setValue('serviceNeeded', val)}>
              <SelectTrigger className="bg-mmc-light border-0 rounded-xl py-6 h-auto focus:ring-mmc-teal">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Lab Specimen Transport">Lab Specimen Transport</SelectItem>
                <SelectItem value="Prescription Delivery">Prescription Delivery</SelectItem>
                <SelectItem value="Medical Equipment">Medical Equipment</SelectItem>
                <SelectItem value="STAT/Emergency">STAT/Emergency</SelectItem>
                <SelectItem value="Supplies">Supplies</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.serviceNeeded && <p className="text-xs text-red-500 font-bold">{errors.serviceNeeded.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="font-bold text-mmc-dark">Message / Details (Optional)</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Any specific delivery requirements..."
              className="bg-mmc-light border-0 rounded-xl min-h-[100px] focus:ring-mmc-teal"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl py-8 text-lg font-bold shadow-airbnb transition-all mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              'Send Inquiry'
            )}
          </Button>
          <p className="text-center text-[10px] text-mmc-gray font-medium uppercase tracking-wider">
            Fast response guaranteed for healthcare providers
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}