"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Shield, Sparkles, RefreshCw } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: Date
}

const SUGGESTIONS = [
  "What is phishing?",
  "How do I create a strong password?",
  "What is a VPN and why should I use one?",
  "How do I spot a scam email?",
  "What is two-factor authentication?",
  "What should I do if my account is hacked?",
]

const KNOWLEDGE_BASE: Record<string, string> = {
  phishing: "Phishing is a type of social engineering attack where attackers disguise themselves as a trustworthy entity to trick you into revealing sensitive information like passwords, credit card numbers, or personal data. Common signs include:\n\n- Urgent or threatening language (\"Your account will be closed!\")\n- Suspicious sender addresses (check for typos like paypa1.com)\n- Requests for personal information\n- Generic greetings (\"Dear Customer\")\n- Mismatched or suspicious links\n\nAlways verify the sender through official channels before clicking links or providing information.",

  password: "A strong password is your first line of defense. Here are modern best practices:\n\n- Use passphrases: Combine 4+ random words (e.g., \"correct-horse-battery-staple\")\n- Make it long: Aim for 16+ characters\n- Use a password manager to generate and store unique passwords\n- Enable two-factor authentication (2FA) everywhere\n- Never reuse passwords across sites\n- Change passwords only when a breach is suspected (per NIST guidelines)\n\nThe key insight: Length beats complexity. A long passphrase is much harder to crack than a short complex password.",

  vpn: "A VPN (Virtual Private Network) creates an encrypted tunnel between your device and the internet. Here is why it matters:\n\n- Encrypts your internet traffic so others on the same network cannot snoop\n- Essential on public Wi-Fi (coffee shops, airports, hotels)\n- Hides your browsing from your ISP\n- Protects against man-in-the-middle attacks\n\nWhen choosing a VPN:\n- Use reputable paid providers (free VPNs often sell your data)\n- Check their no-logging policy\n- Look for OpenVPN or WireGuard protocols\n- Avoid VPNs based in countries with strict data retention laws",

  scam: "Spotting scam emails requires attention to detail. Look for these red flags:\n\n1. Sender address: Check the actual email domain, not just the display name\n2. Urgency: \"Act now!\" or \"Account will be suspended!\" are manipulation tactics\n3. Links: Hover (don't click) to see the real URL destination\n4. Attachments: Never open unexpected attachments, especially .exe, .zip, or macro-enabled documents\n5. Grammar: While not always reliable, poor grammar can indicate a scam\n6. Too good to be true: Prize notifications, unexpected refunds, or inheritance emails\n\nWhen in doubt, contact the supposed sender through their official website or phone number - never through the suspicious email.",

  "two-factor": "Two-Factor Authentication (2FA) adds a second layer of security beyond your password. Types include:\n\n- Authenticator apps (Google Authenticator, Authy) - Recommended\n- Hardware security keys (YubiKey) - Most secure\n- SMS codes - Better than nothing, but vulnerable to SIM swapping\n- Email codes - Moderate security\n\nAlways enable 2FA on:\n- Email accounts (most critical - it is the key to all other accounts)\n- Banking and financial services\n- Social media accounts\n- Cloud storage services\n\n2FA blocks 99.9% of automated attacks, even if your password is compromised.",

  hacked: "If you suspect your account has been hacked, act quickly:\n\n1. Change your password immediately (from a different, secure device if possible)\n2. Enable 2FA if not already active\n3. Check for unauthorized activity (sent emails, purchases, setting changes)\n4. Revoke access to all active sessions\n5. Check connected apps and remove suspicious ones\n6. Update passwords for any accounts using the same password\n7. Run an antivirus scan on your devices\n8. Monitor your accounts for further suspicious activity\n9. Report to the service provider\n10. If financial accounts are involved, contact your bank immediately\n\nPrevention: Use unique passwords everywhere and enable 2FA to minimize future risk.",

  malware: "Malware is malicious software designed to damage or gain unauthorized access to systems. Common types:\n\n- Ransomware: Encrypts your files and demands payment\n- Trojans: Disguised as legitimate software\n- Worms: Self-replicating across networks\n- Spyware: Monitors your activity secretly\n- Keyloggers: Records your keystrokes\n- Rootkits: Hides deep in your OS for persistent access\n\nProtection tips:\n- Keep your OS and software updated\n- Use reputable antivirus software\n- Never download from untrusted sources\n- Be cautious with email attachments\n- Back up your data regularly (3-2-1 rule: 3 copies, 2 media types, 1 offsite)",

  firewall: "A firewall monitors and controls incoming and outgoing network traffic based on security rules. Think of it as a bouncer for your network:\n\n- Blocks unauthorized access attempts\n- Filters traffic based on rules you define\n- Can be hardware (router-level) or software (OS-level)\n- Essential for both home and enterprise networks\n\nBest practices:\n- Enable your OS firewall (it is usually on by default)\n- Configure your router's built-in firewall\n- Use deny-all as the default inbound policy\n- Only allow traffic you specifically need\n- Regularly review and update firewall rules\n- Log dropped packets to monitor for threats",

  encryption: "Encryption converts readable data into an unreadable format that can only be decoded with a key. It is fundamental to cybersecurity:\n\n- HTTPS: Encrypts web traffic (look for the padlock icon)\n- End-to-end encryption: Only sender and receiver can read messages (Signal, WhatsApp)\n- Full-disk encryption: Protects all data on your device (BitLocker, FileVault)\n- File encryption: Protects individual files and folders\n\nKey concepts:\n- Symmetric encryption: Same key to encrypt and decrypt (AES)\n- Asymmetric encryption: Public/private key pair (RSA)\n- Hashing: One-way transformation for passwords (bcrypt, Argon2)\n\nAlways use encrypted connections for sensitive data.",

  default: "I am CyberBot, your cybersecurity learning assistant. I can help you with topics like:\n\n- Password security and best practices\n- Phishing detection and prevention\n- VPN and network safety\n- Malware identification and defense\n- Two-factor authentication\n- What to do if you are hacked\n- Encryption basics\n- Firewall configuration\n\nTry asking me a specific question about any of these topics, or click one of the suggested questions above."
}

function findResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes("phish") || lower.includes("fake email") || lower.includes("suspicious email")) return KNOWLEDGE_BASE.phishing
  if (lower.includes("password") || lower.includes("passphrase") || lower.includes("pass word")) return KNOWLEDGE_BASE.password
  if (lower.includes("vpn") || lower.includes("virtual private")) return KNOWLEDGE_BASE.vpn
  if (lower.includes("scam") || lower.includes("spam") || lower.includes("fake") || lower.includes("spot")) return KNOWLEDGE_BASE.scam
  if (lower.includes("2fa") || lower.includes("two-factor") || lower.includes("two factor") || lower.includes("mfa") || lower.includes("authenticat")) return KNOWLEDGE_BASE["two-factor"]
  if (lower.includes("hack") || lower.includes("breach") || lower.includes("compromis") || lower.includes("stolen")) return KNOWLEDGE_BASE.hacked
  if (lower.includes("malware") || lower.includes("virus") || lower.includes("ransomware") || lower.includes("trojan") || lower.includes("worm") || lower.includes("spyware")) return KNOWLEDGE_BASE.malware
  if (lower.includes("firewall") || lower.includes("fire wall")) return KNOWLEDGE_BASE.firewall
  if (lower.includes("encrypt") || lower.includes("https") || lower.includes("ssl") || lower.includes("tls")) return KNOWLEDGE_BASE.encryption
  return KNOWLEDGE_BASE.default
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Welcome to CyberBot. I am your cybersecurity learning assistant. Ask me anything about staying safe online, or try one of the suggested topics below.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(text?: string) {
    const msg = text || input.trim()
    if (!msg) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: msg,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = findResponse(msg)
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  function handleClear() {
    setMessages([{
      id: "welcome",
      role: "bot",
      content: "Welcome to CyberBot. I am your cybersecurity learning assistant. Ask me anything about staying safe online, or try one of the suggested topics below.",
      timestamp: new Date(),
    }])
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">CyberBot</h1>
                <p className="text-xs text-cyber-green flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyber-green animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleClear} className="border-border text-muted-foreground hover:text-foreground">
              <RefreshCw className="mr-1 h-3 w-3" />
              Clear
            </Button>
          </div>

          {/* Messages */}
          <div className="mt-4 flex-1 overflow-y-auto rounded-xl border border-border bg-card/50 p-4">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    msg.role === "bot"
                      ? "bg-primary/10 border border-primary/20 text-primary"
                      : "bg-secondary border border-border text-foreground"
                  )}>
                    {msg.role === "bot" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-xl px-4 py-3",
                    msg.role === "bot"
                      ? "bg-secondary text-foreground"
                      : "bg-primary/10 text-foreground"
                  )}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="rounded-xl bg-secondary px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <Sparkles className="mr-1 inline h-3 w-3" />
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="mt-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask CyberBot a question..."
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              disabled={isTyping}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              size="icon"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
