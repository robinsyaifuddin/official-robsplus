
import React, { useState } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Settings, Globe, Palette, Share2, FileText, Upload, 
  CheckCheck, RefreshCw, Smartphone, Desktop, Tablet
} from 'lucide-react';
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const WebsiteSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock website settings
  const [settings, setSettings] = useState({
    title: 'ROBsPlus - Official Website',
    description: 'Website resmi ROBsPlus Indonesia. Penyedia layanan software dan solusi IT terbaik.',
    keywords: 'robsplus, software, it solution, web development, mobile app',
    favicon: '/lovable-uploads/a67d8107-f890-4209-b488-428e15485798.png',
    logo: '/lovable-uploads/a67d8107-f890-4209-b488-428e15485798.png',
    primaryColor: '#9B30FF',
    secondaryColor: '#B668FF',
    accentColor: '#6A0DAD',
    contactEmail: 'info@robsplus.com',
    contactPhone: '+62 85768192419',
    address: 'Jakarta, Indonesia',
    socialMedia: {
      facebook: 'https://facebook.com/robsplus',
      instagram: 'https://instagram.com/robsplus',
      twitter: 'https://twitter.com/robsplus',
      linkedin: 'https://linkedin.com/company/robsplus',
    },
  });

  const handleSaveSettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Pengaturan website berhasil disimpan");
      setIsLoading(false);
    }, 1500);
  };

  const handleSaveMetaTags = () => {
    toast.success("Meta tags berhasil diperbarui");
  };

  const handleSaveSocialMedia = () => {
    toast.success("Pengaturan social media berhasil disimpan");
  };

  const handleSaveContactInfo = () => {
    toast.success("Informasi kontak berhasil diperbarui");
  };

  const handleSaveAppearance = () => {
    toast.success("Tampilan website berhasil diperbarui");
  };

  const handleImageUpload = (field: string) => {
    toast.success(`Gambar ${field} berhasil diupload`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pengaturan Website</h1>
        <p className="mt-1 text-sm text-gray-400">Kelola pengaturan dan konfigurasi website</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="contact">Kontak</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>
                Pengaturan dasar website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="site-title" className="text-sm font-medium text-gray-300">
                  Judul Website
                </label>
                <Input
                  id="site-title"
                  value={settings.title}
                  onChange={(e) => setSettings({...settings, title: e.target.value})}
                  placeholder="Judul Website"
                  className="bg-dark border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="site-description" className="text-sm font-medium text-gray-300">
                  Deskripsi Website
                </label>
                <Textarea
                  id="site-description"
                  value={settings.description}
                  onChange={(e) => setSettings({...settings, description: e.target.value})}
                  placeholder="Deskripsi Website"
                  className="bg-dark border-gray-700"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Logo Website
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="mr-4 h-16 w-16 overflow-hidden rounded-md border border-gray-700 bg-dark">
                        <img 
                          src={settings.logo} 
                          alt="Logo" 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleImageUpload('logo')}
                        className="border-gray-700 text-white"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Favicon
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="mr-4 h-10 w-10 overflow-hidden rounded-md border border-gray-700 bg-dark">
                        <img 
                          src={settings.favicon} 
                          alt="Favicon" 
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleImageUpload('favicon')}
                        className="border-gray-700 text-white"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Responsivitas Website
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="responsive-mobile" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="responsive-mobile" className="flex items-center text-sm text-gray-300">
                      <Smartphone className="mr-1 h-4 w-4" />
                      Mobile
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="responsive-tablet" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="responsive-tablet" className="flex items-center text-sm text-gray-300">
                      <Tablet className="mr-1 h-4 w-4" />
                      Tablet
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="responsive-desktop" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="responsive-desktop" className="flex items-center text-sm text-gray-300">
                      <Desktop className="mr-1 h-4 w-4" />
                      Desktop
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveSettings}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Simpan Pengaturan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Meta Tags Tab */}
        <TabsContent value="meta" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Meta Tags
              </CardTitle>
              <CardDescription>
                Pengaturan SEO dan meta tags untuk website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="meta-title" className="text-sm font-medium text-gray-300">
                  Meta Title
                </label>
                <Input
                  id="meta-title"
                  value={settings.title}
                  onChange={(e) => setSettings({...settings, title: e.target.value})}
                  placeholder="Meta Title"
                  className="bg-dark border-gray-700"
                />
                <p className="text-xs text-gray-400">
                  Direkomendasikan 50-60 karakter. Saat ini: {settings.title.length} karakter
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="meta-description" className="text-sm font-medium text-gray-300">
                  Meta Description
                </label>
                <Textarea
                  id="meta-description"
                  value={settings.description}
                  onChange={(e) => setSettings({...settings, description: e.target.value})}
                  placeholder="Meta Description"
                  className="bg-dark border-gray-700"
                />
                <p className="text-xs text-gray-400">
                  Direkomendasikan 150-160 karakter. Saat ini: {settings.description.length} karakter
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="meta-keywords" className="text-sm font-medium text-gray-300">
                  Meta Keywords
                </label>
                <Input
                  id="meta-keywords"
                  value={settings.keywords}
                  onChange={(e) => setSettings({...settings, keywords: e.target.value})}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-dark border-gray-700"
                />
                <p className="text-xs text-gray-400">
                  Pisahkan dengan koma. Contoh: robsplus, software, it solution
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="meta-robots" className="text-sm font-medium text-gray-300">
                  Robots Meta Tag
                </label>
                <select
                  id="meta-robots"
                  className="w-full rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                >
                  <option value="index,follow">index, follow (default)</option>
                  <option value="noindex,follow">noindex, follow</option>
                  <option value="index,nofollow">index, nofollow</option>
                  <option value="noindex,nofollow">noindex, nofollow</option>
                </select>
                <p className="text-xs text-gray-400">
                  Mengontrol cara search engine mengindeks halaman website Anda
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Open Graph Preview
                </label>
                <div className="rounded-md border border-gray-700 bg-dark p-4">
                  <div className="space-y-2">
                    <div className="h-40 w-full overflow-hidden rounded-md bg-gray-800">
                      <img 
                        src={settings.logo} 
                        alt="OG Image Preview" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{settings.title}</h3>
                      <p className="text-sm text-gray-400">{settings.description}</p>
                      <p className="text-xs text-blue-400">robsplus.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveMetaTags}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Simpan Meta Tags
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Tampilan Website
              </CardTitle>
              <CardDescription>
                Pengaturan warna dan tampilan website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor="primary-color" className="text-sm font-medium text-gray-300">
                    Warna Utama
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="mr-2 h-8 w-8 rounded-md border border-gray-700"
                      style={{backgroundColor: settings.primaryColor}}
                    />
                    <Input
                      id="primary-color"
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                      className="bg-dark border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="secondary-color" className="text-sm font-medium text-gray-300">
                    Warna Sekunder
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="mr-2 h-8 w-8 rounded-md border border-gray-700"
                      style={{backgroundColor: settings.secondaryColor}}
                    />
                    <Input
                      id="secondary-color"
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                      className="bg-dark border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="accent-color" className="text-sm font-medium text-gray-300">
                    Warna Aksen
                  </label>
                  <div className="flex items-center">
                    <div 
                      className="mr-2 h-8 w-8 rounded-md border border-gray-700"
                      style={{backgroundColor: settings.accentColor}}
                    />
                    <Input
                      id="accent-color"
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) => setSettings({...settings, accentColor: e.target.value})}
                      className="bg-dark border-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Preview Skema Warna
                </label>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="overflow-hidden rounded-md border border-gray-700">
                    <div 
                      className="h-16 w-full"
                      style={{backgroundColor: settings.primaryColor}}
                    />
                    <div 
                      className="h-8 w-full"
                      style={{backgroundColor: settings.secondaryColor}}
                    />
                    <div className="p-4" style={{backgroundColor: "#121212"}}>
                      <div 
                        className="mb-2 rounded-md px-4 py-2 text-white"
                        style={{backgroundColor: settings.primaryColor}}
                      >
                        Primary Button
                      </div>
                      <div 
                        className="rounded-md px-4 py-2 text-white"
                        style={{backgroundColor: settings.secondaryColor}}
                      >
                        Secondary Button
                      </div>
                      <div className="mt-2">
                        <p className="text-white">Text Sample</p>
                        <p className="text-gray-400">Secondary Text Sample</p>
                        <p style={{color: settings.accentColor}}>Accent Text Sample</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-2">
                      <label htmlFor="font-select" className="text-sm font-medium text-gray-300">
                        Font Utama
                      </label>
                      <select
                        id="font-select"
                        className="w-full rounded-md border border-gray-700 bg-dark px-3 py-2 text-white"
                      >
                        <option value="poppins">Poppins (Default)</option>
                        <option value="roboto">Roboto</option>
                        <option value="open-sans">Open Sans</option>
                        <option value="montserrat">Montserrat</option>
                        <option value="inter">Inter</option>
                      </select>
                    </div>
                    <div className="mt-4 space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        Dark Mode
                      </label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="dark-mode" 
                          checked
                          className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                        />
                        <label htmlFor="dark-mode" className="text-sm text-gray-300">
                          Aktifkan Dark Mode (default)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveAppearance}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Simpan Perubahan Tampilan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="mr-2 h-5 w-5" />
                Social Media
              </CardTitle>
              <CardDescription>
                Pengaturan social media dan integrasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="facebook" className="text-sm font-medium text-gray-300">
                    <span className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </span>
                  </label>
                  <Input
                    id="facebook"
                    value={settings.socialMedia.facebook}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialMedia: {...settings.socialMedia, facebook: e.target.value}
                    })}
                    placeholder="https://facebook.com/yourbrand"
                    className="bg-dark border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium text-gray-300">
                    <span className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </span>
                  </label>
                  <Input
                    id="instagram"
                    value={settings.socialMedia.instagram}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialMedia: {...settings.socialMedia, instagram: e.target.value}
                    })}
                    placeholder="https://instagram.com/yourbrand"
                    className="bg-dark border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium text-gray-300">
                    <span className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                      Twitter
                    </span>
                  </label>
                  <Input
                    id="twitter"
                    value={settings.socialMedia.twitter}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialMedia: {...settings.socialMedia, twitter: e.target.value}
                    })}
                    placeholder="https://twitter.com/yourbrand"
                    className="bg-dark border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium text-gray-300">
                    <span className="flex items-center">
                      <svg className="mr-2 h-5 w-5 text-blue-700" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </span>
                  </label>
                  <Input
                    id="linkedin"
                    value={settings.socialMedia.linkedin}
                    onChange={(e) => setSettings({
                      ...settings, 
                      socialMedia: {...settings.socialMedia, linkedin: e.target.value}
                    })}
                    placeholder="https://linkedin.com/company/yourbrand"
                    className="bg-dark border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium text-gray-300">
                  Social Media Sharing
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="share-buttons" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="share-buttons" className="text-sm text-gray-300">
                      Tampilkan tombol share di halaman
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="share-meta" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="share-meta" className="text-sm text-gray-300">
                      Aktifkan Open Graph meta tags
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="share-twitter" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="share-twitter" className="text-sm text-gray-300">
                      Aktifkan Twitter cards
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveSocialMedia}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Simpan Social Media
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="border-gray-700 bg-dark-secondary">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Informasi Kontak
              </CardTitle>
              <CardDescription>
                Kelola informasi kontak untuk website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium text-gray-300">
                    Email Kontak
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                    placeholder="info@yourdomain.com"
                    className="bg-dark border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-sm font-medium text-gray-300">
                    Nomor Telepon
                  </label>
                  <Input
                    id="contact-phone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                    placeholder="+62 8123456789"
                    className="bg-dark border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-address" className="text-sm font-medium text-gray-300">
                  Alamat
                </label>
                <Textarea
                  id="contact-address"
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  placeholder="Alamat lengkap"
                  className="bg-dark border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="maps-embed" className="text-sm font-medium text-gray-300">
                  Embed Google Maps
                </label>
                <Textarea
                  id="maps-embed"
                  placeholder="<iframe src='https://maps.google.com/...'></iframe>"
                  className="min-h-[100px] bg-dark border-gray-700"
                />
                <p className="text-xs text-gray-400">
                  Salin embed code dari Google Maps untuk menampilkan peta di halaman kontak
                </p>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium text-gray-300">
                  Formulir Kontak
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="contact-form" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="contact-form" className="text-sm text-gray-300">
                      Aktifkan formulir kontak
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="recaptcha" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="recaptcha" className="text-sm text-gray-300">
                      Aktifkan reCAPTCHA untuk formulir
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="notification-email" 
                      checked
                      className="h-4 w-4 rounded border-gray-700 bg-dark text-cyberpunk"
                    />
                    <label htmlFor="notification-email" className="text-sm text-gray-300">
                      Terima notifikasi email
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-700">
              <Button 
                onClick={handleSaveContactInfo}
                className="bg-cyberpunk hover:bg-cyberpunk-light"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Simpan Informasi Kontak
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteSettings;
