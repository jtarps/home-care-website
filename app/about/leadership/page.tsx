import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Award, GraduationCap } from "lucide-react"

const leaders = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Chief Executive Officer",
    image: "/placeholder-user.jpg",
    bio: "Dr. Mitchell brings over 20 years of healthcare leadership experience to Toronto Home Care. She previously served as Director of Community Health Services at Toronto General Hospital and holds a PhD in Health Administration from the University of Toronto.",
    credentials: ["PhD Health Administration", "RN", "MBA Healthcare Management"],
    specialties: ["Healthcare Strategy", "Quality Improvement", "Community Health"],
    email: "sarah.mitchell@torontohomecare.com",
    linkedin: "https://linkedin.com/in/sarahmitchell",
  },
  {
    name: "Michael Chen, RN",
    title: "Director of Clinical Services",
    image: "/placeholder-user.jpg",
    bio: "Michael oversees all clinical operations and ensures the highest standards of care delivery. With 15 years of nursing experience in acute care and home health, he is passionate about bringing hospital-quality care to the home setting.",
    credentials: ["RN", "BScN", "Certified Case Manager"],
    specialties: ["Clinical Operations", "Quality Assurance", "Staff Development"],
    email: "michael.chen@torontohomecare.com",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    name: "Jennifer Rodriguez",
    title: "Director of Operations",
    image: "/placeholder-user.jpg",
    bio: "Jennifer ensures smooth day-to-day operations and exceptional client experiences. Her background in healthcare administration and passion for client advocacy make her instrumental in maintaining our high service standards.",
    credentials: ["MBA Operations", "Healthcare Administration Diploma"],
    specialties: ["Operations Management", "Client Relations", "Process Improvement"],
    email: "jennifer.rodriguez@torontohomecare.com",
    linkedin: "https://linkedin.com/in/jenniferrodriguez",
  },
  {
    name: "Dr. Robert Kim",
    title: "Medical Director",
    image: "/placeholder-user.jpg",
    bio: "Dr. Kim provides medical oversight and ensures clinical protocols meet the highest standards. As a practicing geriatrician, he brings deep expertise in caring for older adults and managing complex medical conditions.",
    credentials: ["MD", "Geriatric Medicine Specialist", "FRCPC"],
    specialties: ["Geriatric Medicine", "Clinical Protocols", "Medical Oversight"],
    email: "robert.kim@torontohomecare.com",
    linkedin: "https://linkedin.com/in/robertkim",
  },
]

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced professionals who guide our mission to provide exceptional home care services
            throughout Toronto and the GTA.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {leaders.map((leader, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{leader.name}</CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-600 mb-2">{leader.title}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {leader.credentials.map((credential, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {credential}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{leader.bio}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {leader.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Contact
                  </a>
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Leadership Philosophy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Continuous Learning</h3>
                <p className="text-gray-600">
                  We believe in staying current with best practices and continuously improving our knowledge and skills.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Excellence in Care</h3>
                <p className="text-gray-600">
                  Our leadership is committed to maintaining the highest standards of care and service delivery.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Open Communication</h3>
                <p className="text-gray-600">
                  We foster an environment of transparency, collaboration, and open dialogue at all levels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
