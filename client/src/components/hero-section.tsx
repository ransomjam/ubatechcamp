import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import heroBg from "@assets/use on hero_1753673323493.png";

export default function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="home" className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="UBa Tech Camp students engaging in tech activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-600/40 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-end items-center h-[40vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight whitespace-nowrap"
        >
          Welcome to UBa Tech Camp
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 sm:mb-8 text-base sm:text-lg"
        >
          Empowering youths with digital skills
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-semibold h-auto py-2 px-4 sm:py-3 sm:px-6 rounded-lg text-sm sm:text-base transition duration-300 transform hover:scale-105"
              >
                Learn More
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary mb-4">About UBa Tech Camp</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  UBa Tech Camp is a transformative digital skills programme hosted at the University of Bamenda.
                  It is designed to empower students with practical, in-demand tech competencies that are essential
                  in today's digital economy. Founded by Jam Ransom, the camp provides free hands-on training in
                  areas such as basic computer skills, data analysis, programming, and essential digital tools.
                </p>

                <p className="text-lg">
                  At its core, UBa Tech Camp is about empowerment, innovation, and career readiness. The programme
                  welcomes students from all faculties and backgrounds, creating an inclusive environment where they
                  can gain critical tech skills, boost their confidence, and apply their knowledge to real-world challenges.
                </p>

                <p className="text-lg font-medium text-primary">
                  UBa Tech Camp is not just a training programme, it is a movement that is shaping the next generation
                  of digital leaders in Cameroon and beyond. It inspires students to think big, learn fast, and lead
                  change through technology.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    setIsDialogOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById('register');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                  className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300"
                >
                  Join the Movement
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
}
