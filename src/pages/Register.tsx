import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserProfile, useHealth } from "@/contexts/HealthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionToggle from "@/components/OptionToggle";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { setUserProfile } = useHealth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [postpartum, setPostpartum] = useState<"yes" | "no">("no");
  const [menopause, setMenopause] = useState<"pre" | "peri" | "post">("pre");

  const handleSubmit = () => {
    if (!name || !age || !email) return;
    const profile: UserProfile = {
      name,
      age: parseInt(age),
      email,
      postpartumStatus: postpartum === "yes",
      menopauseStage: menopause,
    };
    setUserProfile(profile);
    navigate("/questionnaire");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="gradient-hero text-primary-foreground px-4 pt-12 pb-8">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-heading font-bold">Create Profile</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">Tell us about yourself</p>
      </div>

      <motion.div
        className="px-4 -mt-4 max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-card rounded-2xl p-6 shadow-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 28" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <OptionToggle<"yes" | "no">
            label="Postpartum Status"
            value={postpartum}
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            onChange={setPostpartum}
          />
          <OptionToggle<"pre" | "peri" | "post">
            label="Menopause Stage"
            value={menopause}
            options={[
              { value: "pre", label: "Pre" },
              { value: "peri", label: "Peri" },
              { value: "post", label: "Post" },
            ]}
            onChange={setMenopause}
          />
          <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl" disabled={!name || !age || !email}>
            Continue to Assessment
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
