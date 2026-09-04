CREATE TABLE public.consultation_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  preferred_date DATE,
  area TEXT,
  budget TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.consultation_bookings TO anon;
GRANT INSERT ON public.consultation_bookings TO authenticated;
GRANT ALL ON public.consultation_bookings TO service_role;

ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a consultation"
  ON public.consultation_bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);