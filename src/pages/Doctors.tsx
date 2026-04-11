import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const doctors = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Gynecologist & PCOS Specialist", rating: 4.9, available: "Today 3:00 PM", avatar: "PS" },
  { id: 2, name: "Dr. Ananya Verma", specialty: "Endometriosis & Reproductive Health", rating: 4.8, available: "Tomorrow 10:00 AM", avatar: "AV" },
  { id: 3, name: "Dr. Meera Kapoor", specialty: "Psychiatrist — Postpartum Depression", rating: 4.7, available: "Today 5:30 PM", avatar: "MK" },
  { id: 4, name: "Dr. Ritu Desai", specialty: "Menopause & Hormone Therapy", rating: 4.9, available: "Wed 11:00 AM", avatar: "RD" },
  { id: 5, name: "Dr. Kavya Nair", specialty: "General OB-GYN", rating: 4.6, available: "Thu 2:00 PM", avatar: "KN" },
];

const Doctors = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [booked, setBooked] = useState<number | null>(null);

  const book = (id: number) => {
    setBooked(id);
    toast({
      title: "Appointment Requested",
      description: "Your health report has been shared with the doctor. You'll receive a confirmation shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="gradient-hero text-primary-foreground px-4 pt-8 pb-6">
        <button onClick={() => navigate("/results")} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-3">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-heading font-bold">Consult a Doctor</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Share your report & book an appointment</p>
      </div>

      <div className="px-4 max-w-md mx-auto -mt-3 space-y-3">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.id}
            className="bg-card rounded-2xl p-4 shadow-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                {doc.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm text-foreground">{doc.name}</h3>
                <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-risk-moderate">
                    <Star className="w-3 h-3 fill-current" /> {doc.rating}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {doc.available}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => book(doc.id)}
              disabled={booked === doc.id}
              className={`w-full mt-3 rounded-xl text-sm ${booked === doc.id ? "bg-risk-low text-primary-foreground" : "gradient-primary text-primary-foreground"}`}
              size="sm"
            >
              {booked === doc.id ? (
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Booked</span>
              ) : (
                "Book & Share Report"
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
