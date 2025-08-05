import React, { useState } from "react";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../components/ui/select";

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export default function Settings() {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Theme Switcher */}
      <div className="flex items-center justify-between">
        <span>Theme</span>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger>{theme === "light" ? "Light" : "Dark"}</SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Profile Update */}
      <div className="space-y-2">
        <h2 className="font-semibold">Profile</h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button>Update Profile</Button>
      </div>

      {/* Notification Preferences */}
      <div className="flex items-center justify-between">
        <span>Enable Notifications</span>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>

      {/* Language Selection */}
      <div className="flex items-center justify-between">
        <span>Language</span>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>{languages.find(l => l.value === language)?.label}</SelectTrigger>
          <SelectContent>
            {languages.map(lang => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
