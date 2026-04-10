import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SEO } from '@/components/SEO';
import { Phone, Mail, Clock, MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  pickup: z.string().min(5, 'Pickup location is required'),
  delivery: z.string().min(5, 'Delivery destination is required'),
  message: z.string().optional(),
});
type ContactFormValues = z.infer<typeof contactSchema>;
export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSuccess(true);
        toast.success('Request Received', {
          description: "Our dispatch team will contact you shortly."
        });
        reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: "Please call us directly for immediate assistance."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <SEO 
        title="Contact & Request Delivery" 
        description="Request a medical delivery or get a quote. 24/7 STAT medical courier dispatch for Northwest Indiana."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Get in <span className="text-mmc-teal">Touch.</span></h1>
                <p className="text-xl text-mmc-gray leading-relaxed">
                  Need a STAT pickup? Have a question about our routes? Our team is available 24/7 for urgent medical logistics.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Immediate Dispatch</h3>
                    <p className="text-mmc-gray">(219) 555-0123</p>
                    <p className="text-xs text-mmc-teal font-bold uppercase mt-1">Available 24/7 for STAT</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Email Inquiries</h3>
                    <p className="text-mmc-gray">dispatch@midwestmedicaldelivery.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Business Hours</h3>
                    <p className="text-mmc-gray">Standard Routes: Mon–Fri, 8AM–6PM</p>
                    <p className="text-mmc-gray">STAT Service: Always Open</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-mmc-dark rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">Coverage Area</h3>
                <p className="text-gray-400 mb-6">Serving Lake and Porter Counties in Indiana, plus selective routes into the Chicago area.</p>
                <div className="flex items-center gap-2 text-mmc-teal font-bold">
                  <MapPin className="h-5 w-5" />
                  Northwest Indiana Corridor
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-airbnb relative">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-mmc-teal/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-10 w-10 text-mmc-teal" />
                  </div>
                  <h2 className="text-3xl font-black text-mmc-dark">Message Received!</h2>
                  <p className="text-mmc-gray text-lg max-w-sm">
                    Thank you for contacting MMC. Our dispatch team is reviewing your request and will call you shortly.
                  </p>
                  <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-xl">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" {...register('name')} placeholder="John Doe" className="bg-mmc-light border-0 rounded-xl py-6" />
                      {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register('phone')} placeholder="(219) 000-0000" className="bg-mmc-light border-0 rounded-xl py-6" />
                      {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className="bg-mmc-light border-0 rounded-xl py-6" />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup City/Facility</Label>
                      <Input id="pickup" {...register('pickup')} placeholder="Munster, IN" className="bg-mmc-light border-0 rounded-xl py-6" />
                      {errors.pickup && <p className="text-xs text-red-500 font-bold">{errors.pickup.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery">Delivery City/Facility</Label>
                      <Input id="delivery" {...register('delivery')} placeholder="Gary, IN" className="bg-mmc-light border-0 rounded-xl py-6" />
                      {errors.delivery && <p className="text-xs text-red-500 font-bold">{errors.delivery.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Delivery Details / Message (Optional)</Label>
                    <Textarea id="message" {...register('message')} placeholder="e.g. STAT Lab Specimens, Pharmacy Route..." className="bg-mmc-light border-0 rounded-xl min-h-[120px]" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl py-8 text-lg font-bold shadow-airbnb">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Request Service'
                    )}
                  </Button>
                  <p className="text-center text-xs text-mmc-gray font-medium">
                    By submitting, you agree to be contacted via phone or email for service coordination.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}