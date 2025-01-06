import React from 'react'

const FeedingGuide = () => {
    const stages = [
        {
          name: "Solid Feeding Stage 1: 4-6 Months",
          body: "At roughly 6-8 months old, baby will begin to sit up on their own. This may not fully develop for some time, but you'll see them make attempts. It can be anywhere from 2-3 months after starting solids, depending on when you started.During this time, they'll largely eat easy-to-swallow foods like mashed carrots. Remember, it can take up to 15 times of baby eating something before they like it, so don't give up on food if at first they seem uninterested. You can now also start to offer more foods at one time.You can also begin to let them hold the spoon and help you bring it to their mouth.",
          needs:"Things You'll Need: Baby spoons and bowl with lid"
        },
        
      ];
  return (
<>
<h1 className='Title'>Solid Feeding Stages Guide for Babies</h1>
<p className='introduction'>For parents of solid food beginners, it can feel a bit overwhelming trying to figure out what food is safe and what isn't, what portions baby should eat, and how often they should be eating. To help, we've broken it down into three solid feeding stages from beginner to a year old, based on certain physical and age-related milestones. In general, until baby is at least one year of age, they should not be fed the following food: Honey, cow's milk, eggs, citrus fruits/drinks, and shellfish.</p>
<p className='intro'>It's important to remember that this is a general guideline and you should always speak with your pediatrician about your individual baby's solid feeding plan, including which foods to omit and for how long.</p>

</>  )
}

export default FeedingGuide