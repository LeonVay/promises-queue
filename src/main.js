const origText = `"Well, Prince, so Genoa and Lucca are now just family estates of the Buonapartes. But I warn you, if you don't tell me that this means war, if you still try to defend the infamies and horrors perpetrated by that Antichrist--I really believe he is Antichrist--I will have nothing more to do with you and you are no longer my friend, no longer my 'faithful slave,' as you call yourself! But how do you do? I see I have frightened you--sit down and tell me all the news." It was in July, 1805, and the speaker was the well-known Anna Pavlovna Scherer, maid of honor and favorite of the Empress Marya Fedorovna. With these words she greeted Prince Vasili Kuragin, a man of high rank and importance, who was the first to arrive at her reception. Anna Pavlovna had had a cough for some days. She was, as she said, suffering from la grippe; grippe being then a new word in St. Petersburg, used only by the elite. All her invitations without exception, written in French, and delivered by a scarlet-liveried footman that morning, ran as follows: "If you have nothing better to do, Count [or Prince], and if the prospect of spending an evening with a poor invalid is not too terrible, I shall be very charmed to see you tonight between 7 and 10--Annette Scherer." "Heavens! what a virulent attack!" replied the prince, not in the least disconcerted by this reception. He had just entered, wearing an embroidered court uniform, knee breeches, and shoes, and had stars on his breast and a serene expression on his flat face. He spoke in that refined French in which our grandfathers not only spoke but thought, and with the gentle, patronizing intonation natural to a man of importance who had grown old in society and at court. He went up to Anna Pavlovna, kissed her hand, presenting to her his bald, scented, and shining head, and complacently seated himself on the sofa. "First of all, dear friend, tell me how you are. Set your friend's mind at rest," said he without altering his tone, beneath the politeness and affected sympathy of which indifference and even irony could be discerned. "Can one be well while suffering morally? Can one be calm in times like these if one has any feeling?" said Anna Pavlovna. "You are staying the whole evening, I hope?" "And the fete at the English ambassador's? Today is Wednesday. I must put in an appearance there," said the prince. "My daughter is coming for me to take me there." "I thought today's fete had been canceled. I confess all these festivities and fireworks are becoming wearisome." "If they had known that you wished it, the entertainment would have been put off," said the prince, who, like a wound-up clock, by force of habit said things he did not even wish to be believed. "Don't tease! Well, and what has been decided about Novosiltsev's dispatch? You know everything." "What can one say about it?" replied the prince in a cold, listless tone. "What has been decided? They have decided that Buonaparte has burnt his boats, and I believe that we are ready to burn ours." Prince Vasili always spoke languidly, like an actor repeating a stale part. Anna Pavlovna Scherer on the contrary, despite her forty years, overflowed with animation and impulsiveness. To be an enthusiast had become her social vocation and, sometimes even when she did not feel like it, she became enthusiastic in order not to disappoint the expectations of those who knew her. The subdued smile which, though it did not suit her faded features, always played round her lips expressed, as in a spoiled child, a continual consciousness of her charming defect, which she neither wished, nor could, nor considered it necessary, to correct. In the midst of a conversation on political matters Anna Pavlovna burst out: "Oh, don't speak to me of Austria. Perhaps I don't understand things, but Austria never has wished, and does not wish, for war. She is betraying us! Russia alone must save Europe. Our gracious sovereign recognizes his high vocation and will be true to it. That is the one thing I have faith in! Our good and wonderful sovereign has to perform the noblest role on earth, and he is so virtuous and noble that God will not forsake him. He will fulfill his vocation and crush the hydra of revolution, which has become more terrible than ever in the person of this murderer and villain! We alone must avenge the blood of the just one.... Whom, I ask you, can we rely on?... England with her commercial spirit will not and cannot understand the Emperor Alexander's loftiness of soul. She has refused to evacuate Malta. She wanted to find, and still seeks, some secret motive in our actions. What answer did Novosiltsev get? None. The English have not understood and cannot understand the self-abnegation of our Emperor who wants nothing for himself, but only desires the good of mankind. And what have they promised? Nothing! And what little they have promised they will not perform! Prussia has always declared that Buonaparte is invincible, and that all Europe is powerless before him.... And I don't believe a word that Hardenburg says, or Haugwitz either. This famous Prussian neutrality is just a trap. I have faith only in God and the lofty destiny of our adored monarch. He will save Europe!"`;

/**
 * @param parentElement - DOM element, container for async blocks
 * @param handleBtn() - callback, triggers async blocks construction
 * @param childElement - DOM element, contains default template
 * @param elementStringRepresentation - string representation of template element
 * @param htmlToElement() - helper function, return DOM element of async block template
 * @param appendParent() - helper function, add DOM element (async block) into parent container
 * 
 * @param startBtn - DOM element, start button control. HTML Element
 * @param arrLength - number, variable contains number of elements passed form input. Number
 * @param queueLimit - number, variable contains limit of executable async promises. Number
 * @param executionQueu - contains promises. Promise[]
 * @param processed - Number, counter of processed elements
 */
const elementStringRepresentation = `
<div class="content-item">
    <h4 class="content-item-header"></h4>
    <p class="content-item-data"></p>
</div>
`;
const childElement = htmlToElement(elementStringRepresentation);
const handleBtn = async () =>  {
    handleClickCb();
};
let parentElement = null;
let arrLength = 0;
let queueLimit = 0;
let startBtn = null;
let executionQueu = null;
let headersArray = generateArray();
let queueProcess = [];
let processed = 0;

/**
 * On Load handler
 * set parentElement reference
 * add listeners for <input> elements
 */
window.onload = () => {
    parentElement = document.getElementById('content');
    
    document.getElementsByName('arrLength')[0].oninput = (evt) => {
        arrLength = parseInt(evt.currentTarget.value, 10);
        checkBtnState();
    };

    document.getElementsByName('queueLimit')[0].oninput = (evt) => {
        queueLimit = parseInt(evt.currentTarget.value, 10);
        checkBtnState();
    };
}

/**
 * Generate Headers array from original text.
 * @returns String[]
 * @param length Number - length of array, default set to 5
 */
function generateArray(length = 5) {
    return new Array(length).fill('empty').map((item) => {
        let strLength = Math.round(Math.random() * 20) + 180;
        let randomIndex = Math.round(Math.random() * 200 + Math.random() * origText.length - 100) - 220;
        let randomIndexEnd = randomIndex + strLength > origText.length ? origText.length : randomIndex + strLength;
        let randomizeditem = origText.slice(randomIndex, randomIndexEnd);
        item = randomizeditem === "" ? origText.slice(randomIndex - 200 , randomIndexEnd) : randomizeditem;
        return item;
    });
}

/**
 * Get <p> text for each async block
 * @returns String
 * @param index Number - index of async block
 */
function getTextToDisplay(index) {
    return origText.split('.')[index];
}

/**
 * Helper function, generate DOM element from string template instead of individual calls to createElement(tag)
 * @param html String - string representation of block
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

/**
 * Helper function, add DOM block into parent container
 * @param {*} index Number - individual id (index)
 */
function appendParent(index) {
    let elm = childElement.cloneNode(true);
    elm.id = 'child-' + index;
    elm.firstElementChild.textContent = index + 1 + '. ' + headersArray[index];
    parentElement.append(elm);
}

/**
 * Main async hanler.
 * queue - limited queue of Promises
 * headersArray - generated array of strings for blocks headers
 */
async function handleClickCb() {
    cleanupCheck();

    headersArray = generateArray(arrLength);
    let queue = [];
    document.getElementById('blocks-counter').innerText = `Processed ${processed} of ${arrLength}`;
    for (const [i, v] of headersArray.entries()) {
        const p = mapper(i);
        queue.push(p);
        p.then(res => {
            queue.splice(queue.indexOf(p), 1);
            processed += 1;
            document.getElementById('blocks-counter').innerText = `Processed ${processed} of ${arrLength}`;
            return res;
        });
        // if max concurrent, wait for one to finish
        if (queue.length >= queueLimit) {
            await Promise.race(queue);
        }
    }
}

function cleanupCheck() {
    let itemsList = Array.from(document.getElementsByClassName('content-item'));
    if (itemsList.length) {
        itemsList.forEach((item) => item.remove());
        document.getElementById('startBtn').disabled = true;
        arrLength = 0;
        processed = 0;
        queueLimit = 0;
    }
}

/**
 * CheckBtnState
 * Helper function, disable/enable Start button state.
 * arrLength - input value, set length of array of blocks
 * queueLimit - input value, set limit for simultaneously executable Promises (blocks)
 */
function checkBtnState() {
    if (arrLength && queueLimit) {
        document.getElementById('startBtn').disabled = false;
    } else {
        document.getElementById('startBtn').disabled = true;
    }
}

/**
 * mapper - generate new Promise, add <p> text on resolve.
 * @param {*} a - Number, index in array
 */
const mapper = (a) => new Promise((resolve) => {
    setTimeout(() => {
        document.getElementById('child-' + a).lastElementChild.textContent = getTextToDisplay(a);
        resolve(a);
    }, Math.round(Math.random() * 9000) + 1000);
    appendParent(a);
});

