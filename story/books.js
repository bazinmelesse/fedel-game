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
  docho: { title:"ዶጮ እና የግዙፉ ጫማ", en:"Docho and the Giant's Shoe", art:() => window.STORY_ART_DOCHO, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ጫ", am:[
      "በአንድ መንደር ዶጮ የሚባል ትንሽ ጫማ ሰፊ ይኖር ነበር። ዶጮ ከሁሉም ሰው ያነሰ ነበር፤ ግን ጎበዝ ነበር።",
      "ለሕፃናት ትንንሽ ጫማ፣ ለገበሬዎች ጠንካራ ጫማ ይሰፋ ነበር። ሰዎችም «ዶጮ ትንሽ ነው፤ ሥራው ግን ትልቅ ነው!» ይሉ ነበር።"],
    en:["In a village lived a little shoemaker named Docho. Docho was smaller than everyone, but he was very good at his work.",
      "He made tiny shoes for babies and strong shoes for farmers. People said, \"Docho is small, but his work is big!\""] },
  { art:"p2", key:"ጉ", am:[
      "አንድ ቀን ጠዋት መሬቱ ተንቀጠቀጠ። ዱም! ዱም! ዱም! ከተራራው የመጣው ግዙፉ አባ ጉልቤ ነበር።",
      "የአባ ጉልቤ የድሮ ጫማ ተቀዳዶ ነበር፤ ጣቶቹም ወጥተው ይታዩ ነበር።",
      "«ዶጮ ሆይ» አለ አባ ጉልቤ። «ወደ ላሊበላ ረጅም መንገድ ልሄድ ነው። አዲስ ጫማ ትሰፋልኛለህ?» ዶጮም «እሺ፣ እሰፋልሃለሁ!» አለ።"],
    en:["One morning the ground shook. Boom! Boom! Boom! It was Aba Gulbe, the giant from the mountain.",
      "Aba Gulbe's old shoes were full of holes, and his toes were poking out.",
      "\"Docho,\" said Aba Gulbe, \"I am going on a long walk to Lalibela. Will you make me new shoes?\" And Docho said, \"Yes, I will!\""] },
  { art:"p3", key:"መ", am:[
      "ዶጮ መጀመሪያ እግሩን መለካት ነበረበት። ረጅም መሰላል አምጥቶ በአባ ጉልቤ እግር ላይ ወጣ።",
      "በገመድ ለካ፦ አንድ፣ ሁለት፣ ሦስት… እግሩ እንደ ዛፍ ረጅም ነበር!",
      "«ዋው! ይህን ጫማ ብቻዬን አልጨርሰውም» አለ ዶጮ።"],
    en:["First Docho had to measure the foot. He brought a long ladder and climbed up onto Aba Gulbe's foot.",
      "He measured with a rope: one, two, three… The foot was as long as a tree!",
      "\"Wow! I can't finish this shoe by myself,\" said Docho."] },
  { art:"p4", key:"ል", am:[
      "ዶጮ የመንደሩን ልጆች ጠራ። «ልጆች፣ ኑ እርዱኝ!»",
      "ልጆቹም እየሮጡ መጡ። አንዷ ቆዳ አመጣች፤ አንዱ ረጅም ገመድ አመጣ፤ ሌላዋ እንደ ዱላ የሚያክል መርፌ አመጣች።"],
    en:["Docho called the village children. \"Children, come and help me!\"",
      "The children came running. One girl brought leather, one boy brought a long rope, and another girl brought a needle as big as a stick."] },
  { art:"p5", key:"ስ", am:[
      "ሌሊትና ቀን ሰፉ። ዶጮ ከላይ ሆኖ «ጎትቱ! ስፉ! ጎትቱ! ስፉ!» ይል ነበር።",
      "ልጆቹም እየዘመሩ ይሰፉ ነበር።"],
    en:["They sewed day and night. Docho stood on top and called, \"Pull! Sew! Pull! Sew!\"",
      "And the children sang as they sewed."] },
  { art:"p6", key:"ደ", am:[
      "በሰባተኛው ቀን ሁለት ትልልቅ አዲስ ጫማዎች ተዘጋጁ። አባ ጉልቤ ጫማዎቹን አጠለቀና በደስታ ጨፈረ።",
      "መሬቱ ዱም ዱም አለ፤ ልጆቹም ሳቁ። «አመሰግናለሁ ዶጮ! ምን ልክፈልህ?» አለ አባ ጉልቤ።"],
    en:["On the seventh day, two huge new shoes were ready. Aba Gulbe put them on and danced for joy.",
      "The ground went boom, boom, and the children laughed. \"Thank you, Docho! What shall I pay you?\" asked Aba Gulbe."] },
  { art:"p7", key:"ድ", am:[
      "ዶጮ ፈገግ አለ። «የድሮ ጫማህን ስጠኝ።»",
      "አባ ጉልቤ ተገረመ። «ይህን የተቀደደ ጫማ? ምን ታደርግበታለህ?»",
      "«ቆይ፣ ታያለህ!» አለ ዶጮ።"],
    en:["Docho smiled. \"Give me your old shoe.\"",
      "Aba Gulbe was surprised. \"This torn old shoe? What will you do with it?\"",
      "\"Wait and see!\" said Docho."] },
  { art:"p8", key:"ቤ", am:[
      "ዶጮና ልጆቹ የድሮውን ጫማ አጠቡት። ቀዳዳዎቹን ሰፉ፤ በርና መስኮት ቆረጡ፤ ከላይ ጣሪያ ሠሩለት።",
      "የድሮው ጫማ የዶጮ ቤት ሆነ! ከፊት ለፊቱም «የዶጮ ጫማ ቤት» የሚል ምልክት ተሰቀለ።"],
    en:["Docho and the children washed the old shoe. They sewed up the holes, cut a door and a window, and built a roof on top.",
      "The old shoe became Docho's house! A sign out front said \"Docho's Shoe House.\""] },
  { art:"p9", key:"አ", am:[
      "አባ ጉልቤ በአዲሱ ጫማው ወደ ላሊበላ ሄደ። ሲመለስም ከተራራው ላይ ሆኖ ለዶጮ እጁን አወዛወዘ።",
      "ዶጮም ከጫማ ቤቱ ፊት ቆሞ እጁን እያወዛወዘ እንዲህ አለ፦ «ትንሽ ብንሆንም፣ አብረን ትልቅ ነገር እንሠራለን!»"],
    en:["Aba Gulbe walked to Lalibela in his new shoes. On his way back, he waved to Docho from the mountain.",
      "Docho waved back from his shoe house and said, \"Even if we are small, together we can make big things!\""] },
  { art:"end", full:true, end:true, am:[], en:[] }
] },
  mumu: { title:"ሙሙ እና ቦሎ", en:"Mumu and Bolo", art:() => window.STORY_ART_MUMU, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ሙ", am:[
      "በአንድ የገጠር ቤት ሙሙ የምትባል ድመትና ቦሎ የሚባል ውሻ ይኖሩ ነበር። ሁለቱም ሁልጊዜ ይጣሉ ነበር።",
      "ሙሙ «የዚህ ቤት ጌታ እኔ ነኝ!» ትላለች። ቦሎ ደግሞ «አይደለም፣ እኔ ነኝ!» ይላል።"],
    en:["In a country house lived a cat named Mumu and a dog named Bolo. The two of them argued all the time.",
      "Mumu would say, \"I'm the boss of this house!\" And Bolo would say, \"No, I am!\""] },
  { art:"p2", key:"ወ", am:[
      "በሁሉም ነገር ይጣሉ ነበር፤ በፀሐይ ቦታው፣ በወተቱ ሳህን፣ በእሳቱ አጠገብ ባለው ምንጣፍ ጭምር።",
      "«የኔ ነው!» «አይ፣ የኔ ነው!»"],
    en:["They argued about everything: the sunny spot, the milk bowl, even the mat by the fire.",
      "\"It's mine!\" \"No, it's mine!\""] },
  { art:"p3", key:"ፍ", am:[
      "አንድ ቀን ማታ ኃይለኛ ዝናብ ጣለ። ትንሿ ፍየል ፊሊ ወደ ቤት አልተመለሰችም።",
      "እማማ አስካለ በጣም ተጨነቀች። «ፊሊ የት ሄደች?»"],
    en:["One evening, heavy rain began to fall. Little Fili the goat didn't come home.",
      "Mama Askale was very worried. \"Where has Fili gone?\""] },
  { art:"p4", key:"ዝ", am:[
      "ሙሙ «እኔ አገኛታለሁ!» አለች። ቦሎም «አይ፣ እኔ አገኛታለሁ!» አለ።",
      "ሁለቱም ለየብቻቸው በዝናቡ ውስጥ ሮጡ። ግን ዝናቡ ብዙ ነበር፤ ማንም ሊያገኛት አልቻለም።"],
    en:["\"I'll find her!\" said Mumu. \"No, I'll find her!\" said Bolo.",
      "Each ran off alone into the rain. But the rain was heavy, and neither of them could find her."] },
  { art:"p5", key:"ጨ", am:[
      "በጨለማው ጫካ ውስጥ ሁለቱ አንድ ዛፍ ሥር ተገናኙ፤ ሁለቱም በስብሰው ነበር።",
      "ቦሎ «አፍንጫዬ ሽታዋን ያውቃል፤ ግን በጨለማ ማየት አልችልም» አለ። ሙሙም «እኔ በጨለማ አያለሁ፤ ግን እንደ አንተ ማሽተት አልችልም» አለች።",
      "ሁለቱም ተያዩ። «አብረን እንፈልጋት?»"],
    en:["In the dark forest, the two met under a tree. Both of them were soaking wet.",
      "Bolo said, \"My nose knows her smell, but I can't see in the dark.\" Mumu said, \"I can see in the dark, but I can't smell like you.\"",
      "They looked at each other. \"Shall we look for her together?\""] },
  { art:"p6", key:"ሽ", am:[
      "ቦሎ መሬቱን እያሸተተ መንገዱን አሳየ። «ሽታዋ ወደዚህ ነው!» አለ።",
      "ሙሙ ደግሞ በብሩህ ዓይኖቿ ወደፊት ተመለከተች። «እዚያ!» አለች። ፊሊ በወንዙ አጠገብ እያለቀሰች ነበር።"],
    en:["Bolo sniffed the ground and showed the way. \"Her smell goes this way!\" he said.",
      "Mumu looked ahead with her bright eyes. \"There!\" she said. Fili was by the river, crying."] },
  { art:"p7", key:"ቁ", am:[
      "ፊሊ በእሾሃማ ቁጥቋጦ ውስጥ ተይዛ ነበር። ሙሙ በቀስታ ገብታ እሾሁን ፈታች። ቦሎም ፊሊን አሞቃት።",
      "ከዚያም ሦስቱም አብረው ወደ ቤት ተመለሱ።"],
    en:["Fili was stuck in a thorny bush. Mumu climbed in gently and pulled the thorns free, and Bolo kept Fili warm.",
      "Then the three of them went home together."] },
  { art:"p8", key:"እ", am:[
      "እማማ አስካለ ሦስቱንም አቀፈቻቸው። «እናንተ ጀግኖች!» አለች።",
      "ለሙሙና ለቦሎ በአንድ ሳህን ሞቅ ያለ ወተት ሰጠቻቸው። በዚያ ምሽት አልተጣሉም።"],
    en:["Mama Askale hugged all three of them. \"You heroes!\" she said.",
      "She gave Mumu and Bolo warm milk in one bowl. That night, they didn't argue."] },
  { art:"p9", key:"ጓ", am:[
      "ከዚያ ቀን ጀምሮ ሙሙና ቦሎ ጓደኛሞች ሆኑ። የፀሐይ ቦታውን፣ ወተቱንና ምንጣፉን አብረው ይካፈላሉ።",
      "ሙሙም «ጓደኛ ስንሆን ሁሉም ነገር ይቀላል» ትላለች። ቦሎም «አዎ!» ይላል።"],
    en:["From that day on, Mumu and Bolo were friends. They share the sunny spot, the milk and the mat.",
      "Mumu says, \"When we're friends, everything is easier.\" And Bolo says, \"Yes!\""] },
  { art:"end", full:true, end:true, am:[], en:[] }
] },
  selam: { title:"ሰላም እና ቀይቱ ዶሮ", en:"Selam and the Red Hen", art:() => window.STORY_ART_SELAM, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ሰ", am:[
      "በአንድ መንደር ሰላም የምትባል ልጅ ትኖር ነበር። ሰላም ቀይ ዶሮ ነበረቻት፤ ስሟም ቀይቱ ነበር።",
      "በየጠዋቱ ከትምህርት ቤት በፊት ሰላም ለቀይቱ እህል ትሰጣት ነበር።"],
    en:["In a village lived a girl named Selam. Selam had a red hen, and the hen's name was Keyitu.",
      "Every morning before school, Selam gave Keyitu some grain."] },
  { art:"p2", key:"እ", am:[
      "በየቀኑ ቀይቱ አንድ እንቁላል ትጥል ነበር።",
      "ሰላም እንቁላሎቹን አንድ በአንድ በቅርጫት ውስጥ ታስቀምጣቸው ነበር።"],
    en:["Every day, Keyitu laid one egg.",
      "Selam put the eggs in a basket, one by one."] },
  { art:"p3", key:"ጠ", am:[
      "አንድ ቀን ቀይቱ ጠፋች!",
      "ሰላም በአትክልቱ ቦታ፣ ከቤቱ ጀርባ፣ በውሃው ጉድጓድ አጠገብ ፈለገቻት። ግን የትም አልነበረችም።"],
    en:["One day, Keyitu was gone!",
      "Selam looked in the garden, behind the house and by the well. But she wasn't anywhere."] },
  { art:"p4", key:"ገ", am:[
      "ከዚያም ከገለባው ክምር ውስጥ ቀስ ያለ «ቅ ቅ ቅ» ሰማች። ቀይቱ በእንቁላሎቹ ላይ ተቀምጣ ነበር!",
      "እናቷም «ቀይቱ እንቁላሎቹን እያሞቀች ነው። በ፳፩ ቀን ጫጩቶች ይወጣሉ» አለቻት።"],
    en:["Then she heard a soft \"cluck, cluck, cluck\" from the pile of hay. Keyitu was sitting on the eggs!",
      "Her mother said, \"Keyitu is keeping the eggs warm. In 21 days, chicks will come out.\""] },
  { art:"p5", key:"ቀ", am:[
      "ሰላም በየቀኑ ግድግዳው ላይ በጠመኔ ቁጥር ጻፈች፦ ፩፣ ፪፣ ፫…",
      "ለቀይቱም በየቀኑ ውሃና እህል አመጣችላት።"],
    en:["Every day, Selam wrote a number on the wall with chalk: 1, 2, 3…",
      "And every day she brought Keyitu water and grain."] },
  { art:"p6", key:"ቋ", am:[
      "በ፳፩ኛው ቀን «ቋ!» የሚል ድምፅ ተሰማ።",
      "«ቋ! ቋ!» እንቁላሎቹ መሰንጠቅ ጀመሩ!"],
    en:["On the 21st day, there was a little \"crack!\"",
      "\"Crack! Crack!\" The eggs began to open!"] },
  { art:"p7", key:"ጫ", am:[
      "ትንንሽ ቢጫ ጫጩቶች ወጡ።",
      "ሰላም ቆጠረች፦ ፩፣ ፪፣ ፫፣ ፬፣ ፭፣ ፮፣ ፯፣ ፰፣ ፱፣ ፲! አሥር ጫጩቶች!"],
    en:["Tiny yellow chicks came out.",
      "Selam counted: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10! Ten chicks!"] },
  { art:"p8", key:"ተ", am:[
      "ጫጩቶቹ ቀይቱን በሁሉም ቦታ ተከተሉ።",
      "ሰላም ከትምህርት ቤት ስትመለስ ደግሞ ሁሉም «ጪው! ጪው!» እያሉ ወደ እሷ ይሮጡ ነበር።"],
    en:["The chicks followed Keyitu everywhere.",
      "And when Selam came home from school, they all ran to her, going \"Cheep! Cheep!\""] },
  { art:"p9", key:"ቤ", am:[
      "ሰላም ፈገግ አለች። «ቀይቱ፣ አሁን ትልቅ ቤተሰብ አለን!»",
      "ቀይቱም «ቅ ቅ ቅ» አለች።"],
    en:["Selam smiled. \"Keyitu, now we have a big family!\"",
      "And Keyitu said, \"Cluck, cluck, cluck.\""] },
  { art:"end", full:true, end:true, am:[], en:[] }
] },
  nib: { title:"ማሬ እና ዝዝ", en:"Mare and Zizi", art:() => window.STORY_ART_NIB, pages:[
  { art:"cover", full:true, am:[], en:[] },
  { art:"p1", key:"ን", am:[
      "በአደይ አበባ በተሞላ ሜዳ ማሬ የምትባል ንብ ትኖር ነበር።",
      "በየጠዋቱ ከአበባ ወደ አበባ እየበረረች የአበባ ጭማቂ ትሰበስብ ነበር።"],
    en:["In a field full of adey abeba flowers lived a bee named Mare.",
      "Every morning she flew from flower to flower, collecting nectar."] },
  { art:"p2", key:"ዝ", am:[
      "ዝዝ የሚባል ዝንብ እየበረረ መጣ። «ዝዝዝ! ማሬ፣ ለምን ሁልጊዜ ትሠሪያለሽ? ነይ እንጫወት!»",
      "ማሬም «ክረምት ከመግባቱ በፊት ማር መሥራት አለብኝ» አለች።"],
    en:["A fly named Zizi came buzzing by. \"Bzzz! Mare, why are you always working? Come and play!\"",
      "Mare said, \"I have to make honey before the rainy season comes.\""] },
  { art:"p3", key:"ጫ", am:[
      "ዝዝ ቀኑን ሙሉ ተጫወተ። በላሟ አፍንጫ ላይ፣ በእንጀራው ላይ፣ በልጁ ጆሮ ላይ አረፈ።",
      "ሁሉም «ሂድ! ሂድ!» አሉት።"],
    en:["Zizi played all day. He landed on the cow's nose, on the injera, and on a boy's ear.",
      "Everyone said, \"Go away! Go away!\""] },
  { art:"p4", key:"ማ", am:[
      "ማሬ የአበባውን ጭማቂ ወደ ቀፎው ወሰደች።",
      "በቀፎው ውስጥ ንቦቹ አብረው ጣፋጭ ማር ሠሩ፤ በትንንሽ የሰም ቤቶች ውስጥም አስቀመጡት።"],
    en:["Mare carried the nectar to the hive.",
      "Inside the hive, the bees made sweet honey together and stored it in tiny wax rooms."] },
  { art:"p5", key:"ክ", am:[
      "ከዚያም ክረምት ገባ።",
      "ጥቁር ደመና ሰማዩን ሸፈነ፤ ዝናቡም ቀንና ሌሊት ዘነበ።"],
    en:["Then the rainy season came.",
      "Dark clouds covered the sky, and the rain fell day and night."] },
  { art:"p6", key:"ራ", am:[
      "ዝዝ በዝናቡ በሰበሰ፣ በረደው፣ ራበውም። ውጪ ምንም ምግብ አልነበረም።",
      "«ዝ… ዝ…» ድምፁ ትንሽ ሆነ።"],
    en:["Zizi was soaked by the rain. He was cold, and he was hungry. There was no food anywhere outside.",
      "\"Bz… bz…\" His buzz became very small."] },
  { art:"p7", key:"ቀ", am:[
      "ዝዝ ወደ ቀፎው በረረና በሩን አንኳኳ።",
      "«ማሬ፣ እባክሽ እርጂኝ!»"],
    en:["Zizi flew to the hive and knocked on the door.",
      "\"Mare, please help me!\""] },
  { art:"p8", key:"ጣ", am:[
      "ማሬ ለዝዝ አንድ ጠብታ ጣፋጭ ማርና ሞቅ ያለ ቦታ ሰጠችው።",
      "«ዛሬ እረዳሃለሁ» አለች። «ከክረምት በኋላ ግን አንተም ትሠራለህ።»"],
    en:["Mare gave Zizi a drop of sweet honey and a warm place to stay.",
      "\"Today I will help you,\" she said. \"But after the rainy season, you will work too.\""] },
  { art:"p9", key:"መ", am:[
      "መስከረም ሲጠባ አደይ አበባ እንደገና አበበ።",
      "ዝዝም ለንቦቹ አዳዲስ አበቦች ያሉበትን ቦታ እያሳየ ረዳቸው። «አብሮ መሥራት ደስ ይላል!» አለ ዝዝ።"],
    en:["When Meskerem came, the adey abeba flowers bloomed again.",
      "And Zizi helped the bees by showing them where the new flowers were. \"Working together is fun!\" said Zizi."] },
  { art:"end", full:true, end:true, am:[], en:[] }
] }
};
