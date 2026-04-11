import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SEO } from '@/components/SEO';
import { Phone, Mail, Clock, MapPin, Loader2, CheckCircle2, Package, MessageSquare, Copy } from 'lucide-react';
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
  const [lastRequest, setLastRequest] = useState<ContactFormValues | null>(null);
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
        const subject = `MMC Delivery Request: ${data.name}`;
        const body = `Clinic: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nPickup: ${data.pickup}\nDelivery: ${data.delivery}\nDetails: ${data.message || 'N/A'}`;
        window.location.href = `mailto:lawrencemurry@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        toast.success('Request routed to dispatch', {
          description: "Complete the submission in your email client for immediate logging."
        });
        setLastRequest(data);
        setIsSuccess(true);
        reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: "Please check your connection or copy your details below."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const copySummary = () => {
    if (!lastRequest) return;
    const summary = `MMC Pickup Request\nClinic: ${lastRequest.name}\nPickup: ${lastRequest.pickup}\nDelivery: ${lastRequest.delivery}`;
    navigator.clipboard.writeText(summary);
    toast.success('Request summary copied');
  };
  return (
    <>
      <SEO
        title="Request Medical Pickup"
        description="Contact MMC for dental office, pharmacy, or vet clinic deliveries. Specialist medical courier dispatch for Northwest Indiana."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Medical <span className="text-mmc-teal">Dispatch.</span></h1>
                <p className="text-xl text-mmc-gray leading-relaxed">
                  Need a pickup for a dental mold or urgent prescription? Our professional dispatch team is standing by to coordinate your regional clinical routes via digital inquiry.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <MessageSquare className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Digital Inquiry</h3>
                    <p className="text-mmc-gray">Verified Clinical Dispatch</p>
                    <p className="text-xs text-mmc-teal font-bold uppercase mt-1">24/7 Monitoring</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Clinic Support</h3>
                    <p className="text-mmc-gray">dispatch@midwestmedicaldelivery.com</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Package className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Logistics Focus</h3>
                    <p className="text-mmc-gray">Professional Medical Transport (Molds, Rx, Supplies)</p>
                    <p className="text-mmc-gray">Optimized Regional Routes</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-mmc-dark rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">Dedicated Regional Coverage</h3>
                <p className="text-gray-400 mb-6">Serving Northwest Indiana clinics with professional regional routes and selective border connections for high-priority clinical cargo.</p>
                <div className="flex items-center gap-2 text-mmc-teal font-bold">
                  <MapPin className="h-5 w-5" />
                  NWI Local Network
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-airbnb relative">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12 animate-in fade-in zoom-in">
                  <div className="w-20 h-20 bg-mmc-teal/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-mmc-teal" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-mmc-dark">Request Logged!</h2>
                    <p className="text-mmc-gray text-lg max-w-sm mx-auto">
                      Your request was routed to dispatch. Please finalize the email in your client.
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-xl font-bold py-6 text-mmc-dark border-2 border-mmc-dark">
                      Send New Request
                    </Button>
                    <Button variant="ghost" onClick={copySummary} className="text-mmc-teal font-bold gap-2">
                      <Copy className="h-4 w-4" />
                      Copy Request Fallback
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Clinic / Contact Name</Label>
                      <Input id="name" {...register('name')} placeholder="Regional Health Clinic" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                      {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" {...register('phone')} placeholder="(XXX) XXX-XXXX" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                      {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="office@clinic.com" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                    {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <Input id="pickup" {...register('pickup')} placeholder="Local Clinic Office" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                      {errors.pickup && <p className="text-xs text-red-500 font-bold">{errors.pickup.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery">Delivery Destination</Label>
                      <Input id="delivery" {...register('delivery')} placeholder="Dental Lab / Pharmacy" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                      {errors.delivery && <p className="text-xs text-red-500 font-bold">{errors.delivery.message}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Delivery Details (Optional)</Label>
                    <Textarea id="message" {...register('message')} placeholder="e.g. Dental molds, prescription bags, clinical supplies..." className="bg-mmc-light border-0 rounded-xl min-h-[120px] focus:ring-2 focus:ring-mmc-teal" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-2xl py-8 text-lg font-bold shadow-airbnb">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Routing to Dispatch...
                      </>
                    ) : (
                      'Request Pickup'
                    )}
                  </Button>
                  <p className="text-center text-xs text-mmc-gray font-medium">
                    Email-routed regional logistics. Midwest Medical Courier.
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