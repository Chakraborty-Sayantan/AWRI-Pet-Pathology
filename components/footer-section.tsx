import { Microscope, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export function FooterSection() {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Test Packages", href: "#" },
  ]

  const services = [
    { name: "Blood Tests", href: "#" },
    { name: "Urine Analysis", href: "#" },
    { name: "Imaging Services", href: "#" },
    { name: "Veterinary Tests", href: "#" },
    { name: "Home Collection", href: "#" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ]

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Microscope className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Company Name</span>
            </div>
            <p className="text-gray-400">
              Leading pathological laboratory providing accurate diagnostic services with cutting-edge technology and
              expert care.
            </p>
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href} className="block text-gray-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
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
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Address</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+91 Phone Number</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">email@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
