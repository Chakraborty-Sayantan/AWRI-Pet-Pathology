import { Microscope, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

export function FooterSection() {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Test Packages", href: "#" },
  ]

 /*  const services = [
    { name: "Blood Tests", href: "#" },
    { name: "Urine Analysis", href: "#" },
    { name: "Imaging Services", href: "#" },
    { name: "Veterinary Tests", href: "#" },
    { name: "Home Collection", href: "#" },
  ] */

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61575947078111", target: "_blank", rel: "noopener noreferrer" },
    { icon: Mail, href: "mailto:info@awriindia.com", target: "_blank", rel: "noopener noreferrer" },
  ]
 /*    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" }, */
  

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center rounded-full bg-neutral-100 h-20 w-20 mr-2">
                <img
                  src="/logo.png"
                  alt="AWRI Logo"
                  className="h-18 w-16 object-contain"
                />
              </span>
              <span className="text-xl font-bold">AWRI</span>
            </div>
            <p className="text-gray-400">
              Leading pathological laboratory providing accurate diagnostic services with cutting-edge technology and
              expert care.
            </p>
            
          </div>

          {/* Quick Links */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href} className="block text-gray-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div> */}

          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Mon-Fri: 7:00 AM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Saturday: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>Sunday: 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
                    {/* Contact Info */}
                    <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">South End Park, Pailan, Diamond Harbour Road. Kolkata 700104, West Bengal</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+919163522664</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@awriindia.com</span>
              </div>
            </div>
          </div>
         
         {/* Social Links */}
            <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Links</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <Link key={index} href={social.href}>
                    <IconComponent className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                  </Link>
                )
              })}
            </div>
            </div>

          {/* Services */}
 {/*          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <div className="space-y-2">
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div> */}


        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AWRI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
