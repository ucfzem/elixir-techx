import { SignUp } from '@clerk/clerk-react';
import { Cpu } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Cpu className="w-12 h-12 text-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-2xl font-black text-white">Inscription</h1>
          <p className="text-gray-500 text-sm mt-1">Créez votre compte TechStore</p>
        </div>
        <div className="rounded-2xl bg-gray-900/50 border border-gray-800/50 p-6">
          <SignUp
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent shadow-none',
                headerTitle: 'text-white hidden',
                headerSubtitle: 'text-gray-500 hidden',
                socialButtonsBlockButton: 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700',
                socialButtonsBlockButtonText: 'text-white font-medium',
                dividerLine: 'bg-gray-800',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-400',
                formFieldInput: 'bg-gray-800 border-gray-700 text-white placeholder-gray-500',
                formButtonPrimary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500',
                footerActionLink: 'text-cyan-400 hover:text-cyan-300',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
