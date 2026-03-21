import { useState } from 'react';

export function LearningInterfacePage() {
  const [chatInput, setChatInput] = useState('');

  return (
    <>
      <div className="p-6 lg:p-10 max-w-6xl mx-auto">
        {/* Breadcrumbs / Context */}
        <div className="flex items-center gap-2 text-sm text-outline mb-6">
          <span className="font-medium">Foundations of Digital Ethics</span>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-on-surface-variant">Module 4: Algorithmic Bias</span>
        </div>

        {/* Video Player Section */}
        <div className="relative group mb-10">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-2xl relative">
            <img
              alt="Lesson Video Thumbnail"
              className="w-full h-full object-cover opacity-60"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNc_Fbc_0-KtUCIE57beL2PlwhivL0Pn_IEclIa8_KhH_8JXqE0jeOnE3tKMMLzIVLeWo9S7p6JlfGPRorn_TkIN_jOoMfZkK-XttYZdj_mci0ngB0XnIDP2mLn7kLqsgPVrAACYFu0AtJ7po9rzcpXfzoNsYrB541GttB0_CEsI9bi-rNcFN3S9agaCXRaFisAo1K7ckBCdL3Nku9G0dbq2yXGBeBQHzQHqf0CwQSfAc24c21vL_SBS8X2kNUR3A83zvU9I6iiIc"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="h-20 w-20 bg-primary/90 text-on-primary rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110 active:scale-95 backdrop-blur-sm">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined cursor-pointer">volume_up</span>
                <div className="h-1 w-48 bg-white/30 rounded-full relative">
                  <div className="absolute inset-0 w-1/3 bg-primary rounded-full"></div>
                </div>
                <span className="text-xs font-medium">12:45 / 45:00</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined cursor-pointer">closed_caption</span>
                <span className="material-symbols-outlined cursor-pointer">settings</span>
                <span className="material-symbols-outlined cursor-pointer">fullscreen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info & Resources (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface mb-4">
                4.2 Identifying Socio-Technical Feedback Loops
              </h1>
              <p className="text-on-surface-variant leading-relaxed">
                In this session, we dive deep into how algorithms don't just reflect human biases—they amplify them through systemic feedback loops. We'll examine case studies from housing, credit scoring, and predictive policing to understand the long-term impact on marginalized communities.
              </p>
            </div>

            {/* Resources Section */}
            <div className="pt-6">
              <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">folder_open</span>
                Lesson Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between group cursor-pointer hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-700">
                      <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Reading_Material_4.2.pdf</p>
                      <p className="text-xs text-outline">2.4 MB</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl flex items-center justify-between group cursor-pointer hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                      <span className="material-symbols-outlined">link</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">Interactive Sandbox</p>
                      <p className="text-xs text-outline">External Tool</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">open_in_new</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Progress / Sidebar Content */}
          <div className="space-y-6">
            <div className="bg-surface-container rounded-2xl p-6">
              <h4 className="font-headline font-bold text-sm text-on-surface mb-4">Course Progress</h4>
              <div className="relative h-2 w-full bg-surface-container-highest rounded-full mb-2 overflow-hidden">
                <div className="absolute inset-0 w-[62%] bg-secondary rounded-full"></div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-secondary">62% Complete</span>
                <span className="text-outline">12 of 18 lessons</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 shadow-sm">
              <h4 className="font-headline font-bold text-sm text-on-surface mb-4 uppercase tracking-wider">Next in this Module</h4>
              <div className="space-y-4">
                <div className="flex gap-3 items-start opacity-50">
                  <span className="text-xs font-bold text-primary mt-1">4.3</span>
                  <p className="text-sm font-medium text-on-surface leading-snug">Mitigation Strategies for Large Language Models</p>
                </div>
                <div className="flex gap-3 items-start opacity-50">
                  <span className="text-xs font-bold text-primary mt-1">4.4</span>
                  <p className="text-sm font-medium text-on-surface leading-snug">The Ethics of Dataset Curation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Chat Panel (Fixed Right) */}
      <aside className="hidden lg:flex flex-col fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-outline-variant/20 shadow-[-10px_0_20px_rgba(0,0,0,0.02)] z-30 overflow-hidden">
        <div className="p-4 bg-primary/5 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-surface">AI Learning Assistant</p>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
                <span className="text-[10px] text-on-secondary-container">Active for Module 4</span>
              </div>
            </div>
          </div>
          <button className="p-1 hover:bg-slate-100 rounded-md">
            <span className="material-symbols-outlined text-sm">more_vert</span>
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
          {/* AI Message */}
          <div className="flex flex-col gap-1 items-start max-w-[90%]">
            <div className="px-4 py-3 bg-surface-container-low rounded-2xl rounded-tl-none text-sm text-on-surface leading-relaxed">
              Hello! I noticed we're covering socio-technical loops. Would you like me to clarify the difference between "sampling bias" and "systemic bias" in the context of the current video?
            </div>
            <span className="text-[10px] text-outline px-1">10:42 AM</span>
          </div>
          {/* User Message */}
          <div className="flex flex-col gap-1 items-end max-w-[90%] ml-auto">
            <div className="px-4 py-3 bg-primary text-on-primary rounded-2xl rounded-tr-none text-sm leading-relaxed">
              Yes, please. How does the feedback loop specifically accelerate the bias?
            </div>
            <span className="text-[10px] text-outline px-1">10:43 AM</span>
          </div>
          {/* AI Message */}
          <div className="flex flex-col gap-1 items-start max-w-[90%]">
            <div className="px-4 py-3 bg-surface-container-low rounded-2xl rounded-tl-none text-sm text-on-surface leading-relaxed">
              Great question. Think of it as a cycle: 1. Biased historical data trains the model. 2. The model makes biased predictions. 3. Real-world actions based on these predictions create <em>new</em> biased data, which is then fed back into the next training round. It reinforces the pattern exponentially.
            </div>
            <span className="text-[10px] text-outline px-1">10:44 AM</span>
          </div>
          {/* Suggested Prompts */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button className="text-[10px] font-medium px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full border border-secondary-container hover:bg-white transition-colors">
              Give an example
            </button>
            <button className="text-[10px] font-medium px-3 py-1.5 bg-secondary-container text-on-secondary-container rounded-full border border-secondary-container hover:bg-white transition-colors">
              Explain "Sampling Bias"
            </button>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-outline-variant/10">
          <div className="relative">
            <textarea
              className="w-full bg-surface-container-low border-none rounded-xl text-sm py-3 pl-4 pr-12 focus:ring-2 focus:ring-primary/20 resize-none placeholder:text-outline"
              placeholder="Ask anything about the lesson..."
              rows={1}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="absolute right-2 top-1.5 h-8 w-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
          <p className="text-[9px] text-center text-outline mt-3">Trained on course curriculum and curated datasets.</p>
        </div>
      </aside>

      {/* FAB for Focus Mode (Only on small screens where sidebar is hidden) */}
      <button className="lg:hidden fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">smart_toy</span>
      </button>
    </>
  );
}
