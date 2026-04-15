import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SEO } from '@/components/SEO';
import { Phone, Mail, Clock, MapPin, Loader2, CheckCircle2, Package, MessageSquare, Copy, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type ContactType = 'general' | 'delivery';

const generalSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(10, 'Please include a message'),
});

const deliverySchema = z.object({
  name: z.string().min(2, 'Clinic / Contact name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  pickup: z.string().min(5, 'Pickup location is required'),
  delivery: z.string().min(5, 'Delivery destination is required'),
  message: z.string().optional(),
});

type GeneralFormValues = z.infer<typeof generalSchema>;
type DeliveryFormValues = z.infer<typeof deliverySchema>;

export function ContactPage() {
  const [contactType, setContactType] = useState<ContactType>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const generalForm = useForm<GeneralFormValues>({
    resolver: zodResolver(generalSchema),
  });

  const deliveryForm = useForm<DeliveryFormValues>({
    resolver: zodResolver(deliverySchema),
  });

  const onSubmitGeneral = async (data: GeneralFormValues) => {
    if (honeypot) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, contactType: 'general' }),
      });
      const json = await res.json() as { success: boolean; data?: { referenceId?: string } };
      if (json.success) {
        setRefId(json.data?.referenceId || '');
        setIsSuccess(true);
        generalForm.reset();
        toast.success('Message sent!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitDelivery = async (data: DeliveryFormValues) => {
    if (honeypot) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, contactType: 'delivery' }),
      });
      const json = await res.json() as { success: boolean; data?: { referenceId?: string } };
      if (json.success) {
        setRefId(json.data?.referenceId || '');
        setIsSuccess(true);
        deliveryForm.reset();
        toast.success('Delivery request routed to dispatch!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Midwest Medical Delivery. Request a pickup, ask a question, or learn more about our HIPAA-compliant delivery services in Northwest Indiana."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-black text-mmc-dark">Get In <span className="text-mmc-teal">Touch.</span></h1>
                <p className="text-xl text-mmc-gray leading-relaxed">
                  Have a question, need a pickup, or just want to learn more? We're here to help — whether you're ready to schedule a route or just exploring your options.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <MessageSquare className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">General Inquiries</h3>
                    <p className="text-mmc-gray">Questions, partnerships, or just saying hi</p>
                    <p className="text-xs text-mmc-teal font-bold uppercase mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Truck className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Delivery Requests</h3>
                    <p className="text-mmc-gray">Schedule a pickup for your clinic or lab</p>
                    <p className="text-xs text-mmc-teal font-bold uppercase mt-1">Same-day dispatch available</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-mmc-light rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-mmc-teal" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mmc-dark">Email Direct</h3>
                    <p className="text-mmc-gray">dispatch@midwestmedicaldelivery.com</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-mmc-dark rounded-3xl text-white">
                <h3 className="text-xl font-bold mb-4">Northwest Indiana Coverage</h3>
                <p className="text-gray-400 mb-6">Serving dental labs, pharmacies, veterinary clinics, and medical facilities across NWI with professional HIPAA-compliant routes.</p>
                <div className="flex items-center gap-2 text-mmc-teal font-bold">
                  <MapPin className="h-5 w-5" />
                  Gary · Hammond · Merrillville · Munster · Crown Point
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-airbnb relative">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12" aria-live="polite">
                  <div className="w-20 h-20 bg-mmc-teal/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-mmc-teal" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-mmc-dark">
                      {contactType === 'delivery' ? 'Request Logged!' : 'Message Sent!'}
                    </h2>
                    <p className="text-mmc-gray text-lg max-w-sm mx-auto">
                      {contactType === 'delivery'
                        ? 'Your delivery request was routed to dispatch. We\'ll follow up shortly.'
                        : 'We received your message and will get back to you within 24 hours.'}
                    </p>
                    {refId && (
                      <div className="bg-mmc-light rounded-2xl p-4 mt-2">
                        <p className="text-xs font-bold text-mmc-teal uppercase tracking-wider mb-1">Reference ID</p>
                        <p className="text-2xl font-black text-mmc-dark tracking-widest">#{refId}</p>
                        <p className="text-xs text-mmc-gray mt-1">Keep this for your records — check your email for confirmation.</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => { setIsSuccess(false); setRefId(''); }}
                    variant="outline"
                    className="rounded-xl font-bold py-6 px-8 text-mmc-dark border-2 border-mmc-dark"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  {/* Toggle */}
                  <div className="flex gap-2 mb-8 bg-mmc-light p-1.5 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setContactType('general')}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        contactType === 'general'
                          ? 'bg-white text-mmc-dark shadow-sm'
                          : 'text-mmc-gray hover:text-mmc-dark'
                      }`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      General Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactType('delivery')}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        contactType === 'delivery'
                          ? 'bg-white text-mmc-dark shadow-sm'
                          : 'text-mmc-gray hover:text-mmc-dark'
                      }`}
                    >
                      <Truck className="h-4 w-4" />
                      Request Delivery
                    </button>
                  </div>

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} />
                  </div>

                  {/* General Form */}
                  {contactType === 'general' && (
                    <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="g-name">Your Name</Label>
                          <Input id="g-name" {...generalForm.register('name')} placeholder="Jane Smith" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {generalForm.formState.errors.name && <p className="text-xs text-red-500 font-bold">{generalForm.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="g-phone">Phone Number</Label>
                          <Input id="g-phone" {...generalForm.register('phone')} placeholder="(219) 555-0100" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {generalForm.formState.errors.phone && <p className="text-xs text-red-500 font-bold">{generalForm.formState.errors.phone.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="g-email">Email Address</Label>
                        <Input id="g-email" type="email" {...generalForm.register('email')} placeholder="jane@example.com" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                        {generalForm.formState.errors.email && <p className="text-xs text-red-500 font-bold">{generalForm.formState.errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="g-message">Your Message</Label>
                        <Textarea id="g-message" {...generalForm.register('message')} placeholder="How can we help you today?" rows={5} className="bg-mmc-light border-0 rounded-xl focus:ring-2 focus:ring-mmc-teal resize-none" />
                        {generalForm.formState.errors.message && <p className="text-xs text-red-500 font-bold">{generalForm.formState.errors.message.message}</p>}
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl py-6 text-base font-bold">
                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Sending...</> : 'Send Message'}
                      </Button>
                    </form>
                  )}

                  {/* Delivery Form */}
                  {contactType === 'delivery' && (
                    <form onSubmit={deliveryForm.handleSubmit(onSubmitDelivery)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="d-name">Clinic / Contact Name</Label>
                          <Input id="d-name" {...deliveryForm.register('name')} placeholder="Regional Health Clinic" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {deliveryForm.formState.errors.name && <p className="text-xs text-red-500 font-bold">{deliveryForm.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-phone">Phone Number</Label>
                          <Input id="d-phone" {...deliveryForm.register('phone')} placeholder="(219) 555-0100" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {deliveryForm.formState.errors.phone && <p className="text-xs text-red-500 font-bold">{deliveryForm.formState.errors.phone.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="d-email">Email Address</Label>
                        <Input id="d-email" type="email" {...deliveryForm.register('email')} placeholder="office@clinic.com" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                        {deliveryForm.formState.errors.email && <p className="text-xs text-red-500 font-bold">{deliveryForm.formState.errors.email.message}</p>}
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="d-pickup">Pickup Location</Label>
                          <Input id="d-pickup" {...deliveryForm.register('pickup')} placeholder="123 Main St, Hammond IN" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {deliveryForm.formState.errors.pickup && <p className="text-xs text-red-500 font-bold">{deliveryForm.formState.errors.pickup.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="d-delivery">Delivery Destination</Label>
                          <Input id="d-delivery" {...deliveryForm.register('delivery')} placeholder="456 Oak Ave, Munster IN" className="bg-mmc-light border-0 rounded-xl py-6 focus:ring-2 focus:ring-mmc-teal" />
                          {deliveryForm.formState.errors.delivery && <p className="text-xs text-red-500 font-bold">{deliveryForm.formState.errors.delivery.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="d-message">Additional Details <span className="text-mmc-gray font-normal">(optional)</span></Label>
                        <Textarea id="d-message" {...deliveryForm.register('message')} placeholder="Type of items, urgency, special handling instructions..." rows={3} className="bg-mmc-light border-0 rounded-xl focus:ring-2 focus:ring-mmc-teal resize-none" />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-mmc-teal hover:bg-mmc-teal/90 text-white rounded-xl py-6 text-base font-bold">
                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Submitting...</> : 'Request Delivery Pickup'}
                      </Button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
