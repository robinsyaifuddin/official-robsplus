
-- Create the news table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  contact_info TEXT,
  is_featured BOOLEAN DEFAULT false,
  slug TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for the news table
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read all news
CREATE POLICY "Allow anonymous read access to news" 
  ON public.news 
  FOR SELECT 
  TO anon 
  USING (true);

-- Allow authenticated users to manage news
CREATE POLICY "Allow authenticated users to manage news" 
  ON public.news 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample news data
INSERT INTO public.news (
  title, 
  content, 
  image_url, 
  contact_info, 
  is_featured, 
  slug
) VALUES 
(
  'Layanan Baru: Jasa Pembuatan Website Profesional',
  'ROBsPlus dengan bangga mengumumkan layanan baru kami: Jasa Pembuatan Website Profesional. Cocok untuk bisnis, portfolio, dan kebutuhan online lainnya dengan harga terjangkau.',
  'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1974&auto=format&fit=crop',
  'https://wa.me/6285768192419?text=Saya%20tertarik%20dengan%20layanan%20pembuatan%20website',
  true,
  'layanan-baru-jasa-pembuatan-website-profesional'
),
(
  'Promo Spesial: Diskon 20% untuk Layanan Digital Marketing',
  'Dapatkan diskon spesial 20% untuk semua paket layanan Digital Marketing kami sepanjang bulan ini. Tingkatkan visibilitas online bisnis Anda dengan harga lebih terjangkau!',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  'marketing@robsplus.com',
  false,
  'promo-spesial-diskon-20-digital-marketing'
),
(
  'Workshop Online: Belajar Desain Grafis untuk Pemula',
  'Kami akan menyelenggarakan workshop online tentang dasar-dasar desain grafis untuk pemula. Acara ini akan mencakup pengenalan Adobe Photoshop, prinsip desain, dan tips praktis.',
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  '0857-6819-2419',
  false,
  'workshop-online-desain-grafis-pemula'
),
(
  'Kolaborasi Baru: ROBsPlus & Komunitas Digital',
  'ROBsPlus baru saja memulai kolaborasi baru dengan Komunitas Digital untuk memberikan lebih banyak sumber daya dan peluang bagi anggota kedua organisasi.',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop',
  'info@robsplus.com',
  true,
  'kolaborasi-baru-robsplus-komunitas-digital'
);
