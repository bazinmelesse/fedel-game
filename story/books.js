/* The picture books. Each page has a picture (from the book's art file), a key letter to highlight,
   and the Amharic text with English underneath. Narration goes in story/audio/<book id>-<page>.mp3,
   from 0 (the cover) to the last page ("The End"). */
window.BOOKS = {
  dama: { title:"ዳማ ኩሩው ድመት", en:"Dama the Proud Cat", art:() => window.STORY_ART, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ድ", am:[
      "በአንድ ትንሽ መንደር ዳማ የሚባል ነጭ ድመት ይኖር ነበር። ዳማ ቆንጆ ነበር፤ ግን በጣም ኩራተኛ ነበር።",
      "«እኔ ከድመቶች ሁሉ እበልጣለሁ!» ይል ነበር። «ከሁሉ የምትበልጠውን አግኝቼ አገባታለሁ!»",
      "ዳማ የመንደሩን ድመቶች ሁሉ ይንቃቸው ነበር። ትንሿን ባለ ሸንተረር ድመት ሚሚንም ጭምር።"],
    en:["In a small village lived a white cat named Dama. Dama was handsome, but very proud.",
      "\"I am the best of all the cats!\" he would say. \"I will find the greatest one of all, and I will marry her!\"",
      "Dama looked down on every cat in the village, even little striped Mimi."] },
  { art:"p2", key:"ጉ", am:[
      "ዳማ ወደ ትልቁ የዋርካ ዛፍ ሄደ። እዚያ ጥበበኛዋ እማማ ጉጉት ትኖር ነበር።",
      "«እማማ ጉጉት፣ ከሁሉ የሚበልጥ ማን ነው?» ብሎ ጠየቃት።",
      "እማማ ጉጉት «ወደ ላይ ተመልከት» አለች። «ፀሐይ ዓለምን ሁሉ ታበራለች። ሂድና ፀሐይን ጠይቅ።»"],
    en:["Dama went to the big warka tree, where wise Grandma Owl lived.",
      "\"Grandma Owl, who is the greatest of all?\" he asked.",
      "\"Look up,\" said Grandma Owl. \"The Sun lights up the whole world. Go and ask the Sun.\""] },
  { art:"p3", key:"ፀ", am:[
      "ዳማ ወደ ረጅሙ ኮረብታ ወጣ፤ ወደ ፀሐይም ጮኸ። «ፀሐይ ሆይ! ከሁሉ የምትበልጪው አንቺ ነሽ?»",
      "ፀሐይ ፈገግ አለች። «እኔ ብርቱ ነኝ፤ ዓለምን አሞቃለሁ። ግን ደመና ሲመጣ ይሸፍነኛል። ደመና ከእኔ ይበልጣል።»",
      "ዳማም ሄደ፣ ሄደ፣ ሄደ…"],
    en:["Dama climbed the tall hill and called to the Sun. \"Sun! Are you the greatest of all?\"",
      "The Sun smiled. \"I am strong. I warm the whole world. But when Cloud comes, he covers me. Cloud is greater than me.\"",
      "And Dama walked, and walked, and walked…"] },
  { art:"p4", key:"ደ", am:[
      "«ደመና ሆይ! ከሁሉ የሚበልጠው አንተ ነህ?»",
      "ደመናው እንዲህ አለ፦ «እኔ ፀሐይን እሸፍናለሁ። ግን ነፋስ ሲነፍስ ይበትነኛል። ነፋስ ከእኔ ይበልጣል።»"],
    en:["\"Cloud! Are you the greatest of all?\"",
      "The Cloud said, \"I cover the Sun. But when Wind blows, he scatters me. Wind is greater than me.\""] },
  { art:"p5", key:"ነ", am:[
      "«ነፋስ ሆይ! ከሁሉ የሚበልጠው አንተ ነህ?»",
      "ነፋሱ «ፋውውው!» አለ። «እኔ ደመናን እበትናለሁ። ግን ተራራን ማንቀሳቀስ አልችልም። ተራራ ከእኔ ይበልጣል።»"],
    en:["\"Wind! Are you the greatest of all?\"",
      "The Wind went \"Whoooosh!\" \"I scatter the clouds. But I cannot move the Mountain. Mountain is greater than me.\""] },
  { art:"p6", key:"ተ", am:[
      "«ተራራ ሆይ! ከሁሉ የሚበልጠው አንተ ነህ?»",
      "ተራራው በዝግታ መለሰ። «እኔ ነፋስን አቆማለሁ። ግን ትንሿ አይጥ ከእግሬ ስር ጉድጓድ ትቆፍራለች፤ ቀስ በቀስ ታፈርሰኛለች። አይጥ ከእኔ ትበልጣለች።»"],
    en:["\"Mountain! Are you the greatest of all?\"",
      "The Mountain answered slowly. \"I stop the Wind. But a little Mouse digs holes under my feet, and bit by bit she wears me down. Mouse is greater than me.\""] },
  { art:"p7", key:"አ", am:[
      "ዳማ ትንሿን አይጥ አገኛት። «አይጥ ሆይ! ከሁሉ የምትበልጪው አንቺ ነሽ?»",
      "አይጧ ተንቀጠቀጠች። «እኔ? ኧረ በፍጹም! እኔ ሚሚን እፈራታለሁ። ሚሚ ስትመጣ ወደ ጉድጓዴ እሮጣለሁ። ሚሚ ከእኔ ትበልጣለች።»"],
    en:["Dama found the little Mouse. \"Mouse! Are you the greatest of all?\"",
      "The Mouse trembled. \"Me? Oh no, not at all! I am scared of Mimi. When Mimi comes, I run into my hole. Mimi is greater than me.\""] },
  { art:"p8", key:"ሚ", am:[
      "«ሚሚ? ያቺ ትንሿ ሚሚ?» ዳማ በጣም ተገረመ። ፀሐይ፣ ደመና፣ ነፋስ፣ ተራራ፣ አይጥ… እና ሚሚ!",
      "ዳማ ወደ መንደሩ ተመልሶ ሚሚን አገኛት። «ሚሚ፣ ይቅርታ አድርጊልኝ። ናቅሁሽ ነበር። አንቺ ግን ከሁሉ ትበልጫለሽ።»",
      "ሚሚ ፈገግ አለች። «ይቅር ብዬሃለሁ፣ ዳማ።»"],
    en:["\"Mimi? Little Mimi?\" Dama was amazed. Sun, Cloud, Wind, Mountain, Mouse… and Mimi!",
      "Dama went back to the village and found her. \"Mimi, please forgive me. I looked down on you. But you are the greatest of all.\"",
      "Mimi smiled. \"I forgive you, Dama.\""] },
  { art:"p9", key:"ሰ", am:[
      "ዳማና ሚሚ ተጋቡ። መንደሩ ሁሉ በሰርጉ ላይ ጨፈረ። ፀሐይም ከላይ ፈገግ አለች።",
      "ዳማም ተማረ፦ «ማንንም መናቅ አይገባም። ትንሹም ቢሆን የራሱ ብርታት አለው።»"],
    en:["Dama and Mimi got married. The whole village danced at the wedding, and the Sun smiled down from above.",
      "And Dama learned: \"Never look down on anyone. Even the smallest has their own strength.\""] },
  { art:"end", full:true, end:true, am:[], en:[] }
] },
  lomi: { title:"ሎሚ እና የግዙፉ ጫማ", en:"Lomi and the Giant's Shoe", art:() => window.STORY_ART_LOMI, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ጫ", am:[
      "በአንድ መንደር ሎሚ የሚባል ትንሽ ጫማ ሰፊ ይኖር ነበር። ሎሚ ከሁሉም ሰው ያነሰ ነበር፤ ግን ጎበዝ ነበር።",
      "ለሕፃናት ትንንሽ ጫማ፣ ለገበሬዎች ጠንካራ ጫማ ይሰፋ ነበር። ሰዎችም «ሎሚ ትንሽ ነው፤ ሥራው ግን ትልቅ ነው!» ይሉ ነበር።"],
    en:["In a village lived a little shoemaker named Lomi. Lomi was smaller than everyone, but he was very good at his work.",
      "He made tiny shoes for babies and strong shoes for farmers. People said, \"Lomi is small, but his work is big!\""] },
  { art:"p2", key:"ጉ", am:[
      "አንድ ቀን ጠዋት መሬቱ ተንቀጠቀጠ። ዱም! ዱም! ዱም! ከተራራው የመጣው ግዙፉ አባ ጉልቤ ነበር።",
      "የአባ ጉልቤ የድሮ ጫማ ተቀዳዶ ነበር፤ ጣቶቹም ወጥተው ይታዩ ነበር።",
      "«ሎሚ ሆይ» አለ አባ ጉልቤ። «ወደ ላሊበላ ረጅም መንገድ ልሄድ ነው። አዲስ ጫማ ትሰፋልኛለህ?» ሎሚም «እሺ፣ እሰፋልሃለሁ!» አለ።"],
    en:["One morning the ground shook. Boom! Boom! Boom! It was Aba Gulbe, the giant from the mountain.",
      "Aba Gulbe's old shoes were full of holes, and his toes were poking out.",
      "\"Lomi,\" said Aba Gulbe, \"I am going on a long walk to Lalibela. Will you make me new shoes?\" And Lomi said, \"Yes, I will!\""] },
  { art:"p3", key:"መ", am:[
      "ሎሚ መጀመሪያ እግሩን መለካት ነበረበት። ረጅም መሰላል አምጥቶ በአባ ጉልቤ እግር ላይ ወጣ።",
      "በገመድ ለካ፦ አንድ፣ ሁለት፣ ሦስት… እግሩ እንደ ዛፍ ረጅም ነበር!",
      "«ዋው! ይህን ጫማ ብቻዬን አልጨርሰውም» አለ ሎሚ።"],
    en:["First Lomi had to measure the foot. He brought a long ladder and climbed up onto Aba Gulbe's foot.",
      "He measured with a rope: one, two, three… The foot was as long as a tree!",
      "\"Wow! I can't finish this shoe by myself,\" said Lomi."] },
  { art:"p4", key:"ል", am:[
      "ሎሚ የመንደሩን ልጆች ጠራ። «ልጆች፣ ኑ እርዱኝ!»",
      "ልጆቹም እየሮጡ መጡ። አንዷ ቆዳ አመጣች፤ አንዱ ረጅም ገመድ አመጣ፤ ሌላዋ እንደ ዱላ የሚያክል መርፌ አመጣች።"],
    en:["Lomi called the village children. \"Children, come and help me!\"",
      "The children came running. One girl brought leather, one boy brought a long rope, and another girl brought a needle as big as a stick."] },
  { art:"p5", key:"ስ", am:[
      "ሌሊትና ቀን ሰፉ። ሎሚ ከላይ ሆኖ «ጎትቱ! ስፉ! ጎትቱ! ስፉ!» ይል ነበር።",
      "ልጆቹም እየዘመሩ ይሰፉ ነበር።"],
    en:["They sewed day and night. Lomi stood on top and called, \"Pull! Sew! Pull! Sew!\"",
      "And the children sang as they sewed."] },
  { art:"p6", key:"ደ", am:[
      "በሰባተኛው ቀን ሁለት ትልልቅ አዲስ ጫማዎች ተዘጋጁ። አባ ጉልቤ ጫማዎቹን አጠለቀና በደስታ ጨፈረ።",
      "መሬቱ ዱም ዱም አለ፤ ልጆቹም ሳቁ። «አመሰግናለሁ ሎሚ! ምን ልክፈልህ?» አለ አባ ጉልቤ።"],
    en:["On the seventh day, two huge new shoes were ready. Aba Gulbe put them on and danced for joy.",
      "The ground went boom, boom, and the children laughed. \"Thank you, Lomi! What shall I pay you?\" asked Aba Gulbe."] },
  { art:"p7", key:"ድ", am:[
      "ሎሚ ፈገግ አለ። «የድሮ ጫማህን ስጠኝ።»",
      "አባ ጉልቤ ተገረመ። «ይህን የተቀደደ ጫማ? ምን ታደርግበታለህ?»",
      "«ቆይ፣ ታያለህ!» አለ ሎሚ።"],
    en:["Lomi smiled. \"Give me your old shoe.\"",
      "Aba Gulbe was surprised. \"This torn old shoe? What will you do with it?\"",
      "\"Wait and see!\" said Lomi."] },
  { art:"p8", key:"ቤ", am:[
      "ሎሚና ልጆቹ የድሮውን ጫማ አጠቡት። ቀዳዳዎቹን ሰፉ፤ በርና መስኮት ቆረጡ፤ ከላይ ጣሪያ ሠሩለት።",
      "የድሮው ጫማ የሎሚ ቤት ሆነ! ከፊት ለፊቱም «የሎሚ ጫማ ቤት» የሚል ምልክት ተሰቀለ።"],
    en:["Lomi and the children washed the old shoe. They sewed up the holes, cut a door and a window, and built a roof on top.",
      "The old shoe became Lomi's house! A sign out front said \"Lomi's Shoe House.\""] },
  { art:"p9", key:"አ", am:[
      "አባ ጉልቤ በአዲሱ ጫማው ወደ ላሊበላ ሄደ። ሲመለስም ከተራራው ላይ ሆኖ ለሎሚ እጁን አወዛወዘ።",
      "ሎሚም ከጫማ ቤቱ ፊት ቆሞ እጁን እያወዛወዘ እንዲህ አለ፦ «ትንሽ ብንሆንም፣ አብረን ትልቅ ነገር እንሠራለን!»"],
    en:["Aba Gulbe walked to Lalibela in his new shoes. On his way back, he waved to Lomi from the mountain.",
      "Lomi waved back from his shoe house and said, \"Even if we are small, together we can make big things!\""] },
  { art:"end", full:true, end:true, am:[], en:[] }
] }
};
