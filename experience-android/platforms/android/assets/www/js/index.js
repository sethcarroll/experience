// Experience
// An Experience Sampling Application

// This mobile application was coded by Seth T. Carroll in 2016 for the Lifespan Emotional Development Lab at Northeastern University,
// based upon the open-source Experience Sampler platform.
// All code below has been commented to explaing and enable ease of understanding and access for those not familiar with Javascript or without coding experience.



/* 
 Okay, so I've laid out this page of code to have general instructions and explanations for anyone new to coding looking to modify the app once I've left the lab. The first thing to know? This, what you're reading now, is called a comment. In Javascript (which this page and the specific functions of this app are written in), comments are denoted by "//" in front of a line of text or the slashes and asterisks before and after a block of text such as this one. Comments usually display in a different color than text that is functioning as code.
 
 Comments are blocks of text that are ignored and not run as code. Therefore, they're perfect for me to leave explanations or "comment" on nearby code. Reading the comments will hopefully explain what most things in this application are doing.
 
 */


// this create a variable for the local storage of survey data
var localStore = window.localStorage;



// The section below stores all of the questions in the normal surveys in a variable "surveyQuestions" as an array of questions
var surveyQuestions = [
                       // A FEW NOTES BEFORE WE BEGIN:
                       // 1. Javascript, and most coding in general, starts with the number zero in lists of data. In the question logic section, questions are referenced by their number. Therefore, the first question is question 0, then 1, 2, 3 and so on. The questions are numbered in comments.
                       // 2. All possible questions are listed in serial order. If question logic dictates some questions are not meant to be displayed, they will be skipped.
                       
                       
                /* THIS IS THE SNOOZE QUESTION. IF "NO" IS SELECTED, IT WILL SCHEDULE ANOTHER REQUEST TO COMPLETE THE SURVEY AT A PREDETERMINED TIME THAT CAN BE SET LATER. CURRENTLY THIS IS 10 MINUTES. */
                       
                       /*0*/
                       {
                       "type":"mult1", // mult1 is a multiple choice question where the answer options are labeled in ascending order
                       "variableName": "A01Snooze", // The variable name is reported on the server as the visual label for each question.
                                                    // Think of the question number as the app's label for each question and the variable name as your label for each question.
                       "questionPrompt": "Are you able to take the survey now?", // the questionPrompt is the text you would like to appear
                                                                                 // on-screen for this question
                       "minResponse": 0, // minResponse is the lowest number reported as an answer to this question
                       "maxResponse": 1, // maxResponse is the largest number. Your labels below should equal the range of minResponse to maxResponse
                       "labels": [
                                  {"label": "Yes"}, // this is answer 0
                                  {"label": "No"}   // this is answer 1
                                  ],
                       },
                       
                /* THESE QUESTIONS ARE ASKED TO ALL PARTICIPANTS AND LEAD TO THE FIRST BRANCHING */
                       
                       /*1*/
                       {
                       "type":"mult2", //mult2 is a multiple choice question where the answer options are labeled in descending order. In this case, it's useful for scales.
                       "variableName": "A02AffectNow",
                       "questionPrompt": "How are you feeling right now?",
                       "minResponse": 1, // conventionally, the minResponse would be 0. However, this is representing a positivity scale from 1-7, so it makes sense to store it as such. You can start at whatever number you want really.
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},     // this is answer 7
                                  {"label": "Positive"},          // this is answer 6
                                  {"label": "A Little Positive"}, // this is answer 5
                                  {"label": "Neutral"},           // this is answer 4
                                  {"label": "A Little Negative"}, // this is answer 3
                                  {"label": "Negative"},          // this is answer 2
                                  {"label": "Very Negative"}      // this is answer 1
                                  ],
                       },
                       
                       
                       /*2*/
                       {
                       "type":"mult1",
                       "variableName": "A03Regulate",
                       "questionPrompt": "Since the last survey, have you tried to do anything to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                       
                       
                /* THESE QUESTIONS ARE THE "YES" BRANCH. */
                       
                       
                       /*3*/
                       {
                       "type":"checklist", // This type of question creates the checkboxes. Multiple selections, or no selections, are allowed before hitting a "Continue" button
                       "variableName": "Y01Goal",
                       "questionPrompt": "Please think of ONE event where you tried to influence your feelings. What was your goal?",
                       "minResponse": 1, // checkboxes are labeled 1 and up, not starting at 0.
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Decrease or stop negative feelings."},
                                  {"label": "Decrease or stop positive feelings."},
                                  {"label": "Increase or create positive feelings."},
                                  {"label": "Increase or create negative feelings."}
                                  ],
                       },
                       
                       /*4*/
                       {
                       "type":"checklist",
                       "variableName": "Y02Context",
                       "questionPrompt": "What did the situation involve? Check all that apply.",
                       "minResponse": 1,
                       "maxResponse": 8,
                       "labels": [
                                  {"label": "Family/Close friends"},
                                  {"label": "Romantic partner"},
                                  {"label": "Strangers/Acquaintances"},
                                  {"label": "Work/School"},
                                  {"label": "Health"},
                                  {"label": "Money"},
                                  {"label": "Leisure/Recreation"},
                                  {"label": "Other"}
                                  ],
                       },
                       
                       
                       /*5*/
                       {
                       "type":"mult1",
                       "variableName": "Y03SitSel?",
                       "questionPrompt": "In this event, did you SELECT to enter or avoid a situation to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                    
                       /*6*/
                       {
                       "type":"checklist",
                       "variableName": "Y04SitSelSubs",
                       "questionPrompt": "You said that you SELECTED a situation. Did you:",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Avoid or leave a negative situation?"},
                                  {"label": "Enter or seek out a positive situation?"},
                                  {"label": "Enter or seek out a negative situation?"},
                                  {"label": "Stay in your current situation?"}
                                  ],
                       },
                       
                       
                       /*7*/
                       {
                       "type":"mult1",
                       "variableName": "Y05SitMod",
                       "questionPrompt": "In this event, did you TAKE ACTION to change a sitution to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                   
                       
                       /*8*/
                       {
                       "type":"checklist",
                       "variableName": "Y06SitModSubs",
                       "questionPrompt": "You said that you TOOK ACTION. Did you:",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Do or say something that would make the situation less negative?"},
                                  {"label": "Do or say something that would make the situation more positive?"},
                                  {"label": "Do or say something that would make the situation more negative?"},
                                  {"label": "Accept the situation even though it was negative?"}
                                  ],
                       },
                       
                       
                       /*9*/
                       {
                       "type":"mult1",
                       "variableName": "Y07Att",
                       "questionPrompt": "In this event, did you SHIFT YOUR ATTENTION to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                       
                       /*10*/
                       {
                       "type":"checklist",
                       "variableName": "Y08AttSubs",
                       "questionPrompt": "You said that you SHIFTED YOUR ATTENTION. Did you:",
                       "minResponse": 1,
                       "maxResponse": 3,
                       "labels": [
                                  {"label": "Ignore or distract yourself from the negative aspects in your environment?"},
                                  {"label": "Pay attention to the positive aspects in your environment?"},
                                  {"label": "Pay attention to the negative aspects in your environment"}
                                  ],
                       },
                       
                       
                       /*11*/
                       {
                       "type":"mult1",
                       "variableName": "Y09Rea",
                       "questionPrompt": "In this event, did you CHANGE YOUR THINKING to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                       
                       /*12*/
                       {
                       "type":"checklist",
                       "variableName": "Y10ReaSubs",
                       "questionPrompt": "You said that you CHANGED YOUR THINKING. Did you:",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Distance yourself or analyze the situation objectively, without emotion?"},
                                  {"label": "Think about the positive aspects or consequences of the situation?"},
                                  {"label": "Think about the negative aspects or consequences of the situation?"},
                                  {"label": "Intentionally accept your emotions, even though they may have been negative?"}
                                  ],
                       },
                       
                       
                       /*13*/
                       {
                       "type":"mult1",
                       "variableName": "Y11Express",
                       "questionPrompt": "In this event, did you CHANGE YOUR EMOTIONAL EXPRESSION to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                       
                       /*14*/
                       {
                       "type":"checklist",
                       "variableName": "Y12ExpressSubs",
                       "questionPrompt": "You said that you CHANGED YOUR EMOTIONAL EXPRESSION. Did you:",
                       "minResponse": 1,
                       "maxResponse": 3,
                       "labels": [
                                  {"label": "Hide the expression of the emotion you were feeling?"},
                                  {"label": "Put on a smile even if you felt negative?"},
                                  {"label": "Intentionally express or exaggerate your expressions?"}
                                  ],
                       },
                       
                       
                       /*15*/
                       {
                       "type":"mult1",
                       "variableName": "Y13RegOther",
                       "questionPrompt": "In this event, did you DO ANYTHING ELSE to influence your feelings?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       
                       
                       /*16*/
                       {
                       "type": "text", // The text option creates a text box and requires text be entered before the "Continue" button will work
                       "variableName": "Y14RegOtherText",
                       "questionPrompt": "You said that you DID SOMETHING ELSE (not listed) to influence how you would feel. What did you do?", // There are no minResponse, maxResponse, or labels required for textbox questions.
                       },
                       
                       
                       /*17*/
                       {
                       "type":"mult2",
                       "variableName": "Y15AffectBefore",
                       "questionPrompt": "BEFORE trying to change your emotions, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       
                       
                       /*18*/
                       {
                       "type":"mult2",
                       "variableName": "Y16AffectAfter",
                       "questionPrompt": "AFTER trying to change your emotions, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       

                       /*19*/
                       {
                       "type":"mult1",
                       "variableName": "Y17AnythingElse",
                       "questionPrompt": "Is there anything else you'd like to mention?",
                       "minResponse": 0,
                       "maxResponse": 1,
                       "labels": [
                                  {"label": "Yes"},
                                  {"label": "No"}
                                  ],
                       },
                       

                       /*20*/
                       {
                       "type": "text",
                       "variableName": "Y18ElseText",
                       "questionPrompt": "Okay. Go ahead and type your answer below.",
                       },
                       
                       
                       
                /*THESE QUESTIONS ARE THE "NO" BRANCH.*/
                       
                       
                       /*21*/
                       {
                       "type":"mult1",
                       "variableName": "N01StrongEmo",
                       "questionPrompt": "You said that you DID NOT try to influence your feelings. Did you experience any strong positive or negative emotions?",
                       "minResponse": 0,
                       "maxResponse": 2,
                       "labels": [
                                  {"label": "No."},
                                  {"label": "Yes, I accepted them/let them play out."},
                                  {"label": "Yes, and I actually did try to influence my emotions."}
                                  ],
                       },
                       
                       
                       /*22*/
                       {
                       "type":"checklist",
                       "variableName": "N02DoingNow",
                       "questionPrompt": "What are you doing right now?",
                       "minResponse": 1,
                       "maxResponse": 6,
                       "labels": [
                                  {"label": "Work or school activity"},
                                  {"label": "Leisure activity"},
                                  {"label": "Socializing"},
                                  {"label": "Traveling/Commuting"},
                                  {"label": "Personal errands/tasks/chores"},
                                  {"label": "Other"}
                                  ],
                       },
                       
                       
                       /*23*/
                       {
                       "type":"mult1",
                       "variableName": "N03Interacting",
                       "questionPrompt": "Are you currently interacting with anyone?",
                       "minResponse": 0,
                       "maxResponse": 2,
                       "labels": [
                                  {"label": "No."},
                                  {"label": "Yes, one other person."},
                                  {"label": "Yes, two or more other people."}
                                  ],
                       },
                       
                       
                       /*24*/
                       {
                       "type":"checklist",
                       "variableName": "N04InteractWho",
                       "questionPrompt": "With whom are you interacting?",
                       "minResponse": 1,
                       "maxResponse": 3,
                       "labels": [
                                  {"label": "Close friend(s) or family"},
                                  {"label": "Acquantance(s)"},
                                  {"label": "Stranger(s)"}
                                  ],
                       },
                    
                       
                       /*25*/
                       {
                       "type":"checklist",
                       "variableName": "N05SitSelPeople",
                       "questionPrompt": "Have you SOUGHT OUT OR AVOIDED ANY PEOPLE because of how they would make you feel?",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Yes, I avoided someone who would make me feel negative."},
                                  {"label": "Yes, I sought out someone who would make me feel positive."},
                                  {"label": "Yes, I sought out someone who would make me feel negative."},
                                  {"label": "No."}
                                  ],
                       },
                       
                       
                       /*26*/
                       {
                       "type":"mult2",
                       "variableName": "N06SitSelPeopleBefore",
                       "questionPrompt": "BEFORE seeking out or avoiding that person/those people, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       
                       
                       /*27*/
                       {
                       "type":"mult2",
                       "variableName": "N07SitSelPeopleAfter",
                       "questionPrompt": "AFTER seeking out or avoiding that person/those people, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       
                       
                       /*28*/
                       {
                       "type":"checklist",
                       "variableName": "N08SitSelActivity",
                       "questionPrompt": "Since the last survey, have you SOUGHT OUT OR AVOIDED AN ACTIVITY because of how it would make you feel?",
                       "minResponse": 1,
                       "maxResponse": 4,
                       "labels": [
                                  {"label": "Yes, I avoided an activity that would make me feel negative."},
                                  {"label": "Yes, I sought out an activity that would make me feel positive."},
                                  {"label": "Yes, I sought out an activity that would make me feel negative."},
                                  {"label": "No."}
                                  ],
                       },
                       
                       
                       /*29*/
                       {
                       "type":"mult2",
                       "variableName": "N09SitSelActivityBefore",
                       "questionPrompt": "BEFORE seeking out or avoiding that activity, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       
                       
                       /*30*/
                       {
                       "type":"mult2",
                       "variableName": "N10SitSelActivityAfter",
                       "questionPrompt": "AFTER seeking out or avoiding that activity, how did you feel?",
                       "minResponse": 1,
                       "maxResponse": 7,
                       "labels": [
                                  {"label": "Very Positive"},
                                  {"label": "Positive"},
                                  {"label": "A Little Positive"},
                                  {"label": "Neutral"},
                                  {"label": "A Little Negative"},
                                  {"label": "Negative"},
                                  {"label": "Very Negative"}
                                  ],
                       },
                       
                // As a final note, there are other types of questions, such as sliding scales, that the ExperienceSampler platform supports. The current implementation of our survey only utilizes mult1, mult2, checklist, and text questions. Further examples and implementations can be found on the experiencesampler website.
                       
                       
];

/* These are the messages that are displayed at the end, whether you've finished a survey or you've snooozed. In the app's design, both snoozing and finishing a survey branch will direct you to an "end" state that attempts to contact the server. */
var lastPage = [
                // This is the survey end message
                {
                "message": "Thank you! Please wait while we send your Experience to the lab. "
                },
                // This is the snooze message
                {
                "message": "No problem! You will be notified again in 10 minutes."
                },
                ];

// This variable is the set of questions that are show when a participant first installs the app and begins to participate.
var participantSetup = [
                        {
                        "type":"text",
                        "variableName": "participant_id",
                        "questionPrompt": "Please enter your participant ID:"
                        },
                        {
                        "type":"timePicker",
                        "variableName": "weekdayWakeTime",
                        "questionPrompt": "What time would you like to start reporting on weekdays?"
                        },
                        {
                        "type":"timePicker",
                        "variableName": "weekdaySleepTime",
                        "questionPrompt": "What time would you like to stop reporting on weekdays?"
                        },
                        {
                        "type":"timePicker",
                        "variableName": "weekendWakeTime",
                        "questionPrompt": "What time would you like to start reporting on weekends?"
                        },
                        {
                        "type":"timePicker",
                        "variableName": "weekendSleepTime",
                        "questionPrompt": "What time would you like to stop reporting on weekends?"
                        },
                        ];

// This variable is set equal to the number of set-up questions.
var NUMSETUPQS = participantSetup.length;

//this tells experience sample which question is the snooze question.
var SNOOZEQ = 0;

//This section of code creates the templates for all of the question types. It's not to be messed with.
var questionTmpl = "<p>{{{questionText}}}</p><ul>{{{buttons}}}</ul>";
var questionTextTmpl = "{{questionPrompt}}";
var buttonTmpl = "<li><button id='{{id}}' value='{{value}}'>{{label}}</button></li>";
var textTmpl = "<li><textarea cols=50 rows=5 id='{{id}}'></textarea></li><li><button type='submit' value='Enter'>Continue</button></li>";
var checkListTmpl =  "<li><input type='checkbox' id='{{id}}' value='{{value}}'>{{label}}</input></li>";
var instructionTmpl = "<li><button id='{{id}}' value = 'Next'>Continue</button></li>";
var sliderTmpl = "<li><input type='range' min='{{min}}' max='{{max}}' value='{{value}}' orient=vertical id='{{id}}' oninput='outputUpdate(value)'></input><output for='{{id}}' id='slider'>50</output><script>function outputUpdate(slidervalue){document.querySelector('#slider').value=slidervalue;}</script></li><li><button type='submit' value='Enter'>Continue</button></li>";
var datePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY" data-template="D MMM YYYY" name="date"><br /><br /></li><li><button type="submit" value="Enter">Continue</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var dateAndTimePickerTmpl = '<li><input id="{{id}}" data-format="DD-MM-YYYY-HH-mm" data-template="D MMM YYYY  HH:mm" name="datetime24"><br /><br /></li><li><button type="submit" value="Enter">Continue</button></li><script>$(function(){$("input").combodate({firstItem: "name",minYear:2015, maxYear:2016});});</script>';
var timePickerTmpl = '<li><input id="{{id}}" data-format="HH:mm" data-template="HH : mm" name="time"><br /><br /></li><li><button type="submit" value="Enter">Continue</button></li><script>$(function(){$("input").combodate({firstItem: "name"});});</script>';
var lastPageTmpl = "<h3>{{message}}</h3>";

// this creates a variable for the unique key generated for each survey. It is just a blank variable here that is set each time the prior survey is completed.
var uniqueKey;

// these create the application and handles interactions with the device. Don't mess with these either.
var app = {
     //Application Constructor
initialize: function() {
    this.bindEvents();
},
     //Bind Event Listeners
bindEvents: function() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    document.addEventListener("resume", this.onResume, false);
    document.addEventListener("pause", this.onPause, false);
},
    //these functions tell the app what to do at different stages of running
onDeviceReady: function() {
    app.init();
},
    
onResume: function() {app.sampleParticipant();},
    
onPause: function() {app.pauseEvents();},
    
    // this function tells the app how to render each question depending on what type of question it is, when to render each question, etc. DON'T MESS WITH THIS, GENERALLY.
renderQuestion: function(question_index) {
    var question;
    //this if-else determines whether the questions to be displayed are the setup questions or survey questions. question_index is meant to be the question nubmer to be displayed. -1 is the value the app feeds it to render setup questions. The number fed to it is determined in the question logic section below to progress the app to the correct questions as needed.
    if (question_index <= -1) {question = participantSetup[question_index + NUMSETUPQS]; }
    else {question = surveyQuestions[question_index];}
    var questionPrompt = question.questionPrompt;
    question.questionText = Mustache.render(questionTextTmpl, {questionPrompt: questionPrompt});
 
    
    //Below are the specifics to render each type of question. We don't need to mess with this. It also includes the question types we aren't using, so they could be implemented by adding those types of questions to the survey questions above, if desired.
    switch (question.type) {
        case 'mult1': // Rating scales (i.e., small numbers at the top of the screen and larger numbers at the bottom of the screen).
            question.buttons = "";
            var label_count = 0;
            for (var i = question.minResponse; i <= question.maxResponse; i++) {
                var label = question.labels[label_count++].label;
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+i,
                                                    value: i,
                                                    label: label
                                                    });
            }
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            $("#question ul li button").click(function(){
                                              app.recordResponse(this, question_index, question.type);
                                              });
            break;
        case 'mult2':  //Rating scales (i.e., positive numbers at the top of the screen and negative numbers at the bottom of the screen).
            question.buttons = "";
            var label_count = 0;
            for (var j = question.maxResponse; j >= question.minResponse; j--) {
                var label = question.labels[label_count++].label;
                question.buttons += Mustache.render(buttonTmpl, {
                                                    id: question.variableName+j,
                                                    value: j,
                                                    label: label
                                                    });
            }
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            $("#question ul li button").click(function(){
                                              app.recordResponse(this, question_index, question.type);
                                              });
            break;
        case 'checklist':
            question.buttons = "";
            var label_count = 0;
            var checkboxArray = [];
            for (var i = question.minResponse; i <= question.maxResponse; i++) {
                var label = question.labels[label_count++].label;
                question.buttons += Mustache.render(checkListTmpl, {
                                                    id: question.variableName+i,
                                                    value: i,
                                                    label: label
                                                    });
            }
            question.buttons += "<li><button type='submit' value='Enter'>Continue</button></li>";
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            $("#question ul li button").click( function(){
                                              checkboxArray.push(question.variableName);
                                              $.each($("input[type=checkbox]:checked"), function(){checkboxArray.push($(this).val());});
                                              app.recordResponse(String(checkboxArray), question_index, question.type);
                                              });
            break;
        case 'slider':
            question.buttons = Mustache.render(sliderTmpl, {id: question.variableName+"1"}, {min: question.minResponse}, {max: question.maxResponse}, {value: (question.maxResponse)/2});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            var slider = [];
            $("#question ul li button").click(function(){
                                              slider.push(question.variableName);
                                              slider.push($("input[type=range]").val());
                                              app.recordResponse(String(slider), question_index, question.type);
                                              });
            break;
        case 'instructions':
            question.buttons = Mustache.render(instructionTmpl, {id: question.variableName+"1"});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            var instruction = [];
            $("#question ul li button").click(function(){
                                              instruction.push(question.variableName);
                                              instruction.push($(this).val());
                                              app.recordResponse(String(instruction), question_index, question.type);
                                              });
            break;
        case 'text': //default to open-ended text, Is currently set to require a response.
            question.buttons = Mustache.render(textTmpl, {id: question.variableName+"1"});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            $("#question ul li button").click(function(){
            if (app.validateResponse($("textarea"))){
            	app.recordResponse($("textarea"), question_index, question.type);
            	}	
            else {
 				alert("Please enter a response.");
				}
			});	
            break;
        case 'datePicker':
            question.buttons = Mustache.render(datePickerTmpl, {id: question.variableName+"1"});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            var date, dateSplit, variableName = [], dateArray = [];
            $("#question ul li button").click(function(){
                                              date = $("input").combodate('getValue');
                                              dateArray.push(question.variableName);
                                              dateArray.push(date);
                                              app.recordResponse(String(dateArray), question_index, question.type);
                                              });
            break;
        case 'dateAndTimePicker':
            question.buttons = Mustache.render(dateAndTimePickerTmpl, {id: question.variableName+"1"});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            var date, dateSplit, variableName = [], dateArray = [];
            $("#question ul li button").click(function(){
                                              date = $("input").combodate('getValue');
                                              dateArray.push(question.variableName);
                                              dateArray.push(date);
                                              app.recordResponse(String(dateArray), question_index, question.type);
                                              });
            break;
        case 'timePicker':
            question.buttons = Mustache.render(timePickerTmpl, {id: question.variableName+"1"});
            $("#question").html(Mustache.render(questionTmpl, question)).fadeIn(400);
            var time, timeSplit, variableName = [], timeArray = [];
            $("#question ul li button").click(function(){
                                              time = $("input").combodate('getValue');
                                              timeArray.push(question.variableName);
                                              timeArray.push(time);
                                              app.recordResponse(String(timeArray), question_index, question.type);
                                              });
            break;
    }
},

    //this function renders the last page of a survey. Last pages are currently either the Snooze page or the Completed Survey page. Basically it renders whichever last page message is assigned to the number it is given and acts accordingly.
renderLastPage: function(pageData, question_index) {
    $("#question").html(Mustache.render(lastPageTmpl, pageData));
   // this says if the function is given the snooze command to schedule a notification to notify them and to render the snooze last page.
    if ( question_index == SNOOZEQ ) {
     app.snoozeNotif();
     localStore.snoozed = 1;
     app.saveData();
     }
    // this says if the given value is not the snooze value when the last page is to be rendered to show the end of survey message and to submit data to the server.
    else if ( question_index == -1) {
       app.saveDataLastPage();
    }
    //This part of the code says that if the participant has completed the entire questionnaire,
    //ExperienceSampler should create a completed tag for it.
    else {
        var datestamp = new Date();
        var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds();
        localStore[uniqueKey + '.' + "completed" + "_" + "completedSurvey"  + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds] = 1;
        app.saveDataLastPage();
    }
},
    
    /* This function initializes the entire application. Also not to be messed with. */
init: function() {
    //First, we assign a value to the unique key when we initialize ExperienceSampler
    uniqueKey = new Date().getTime();
    // The statement below checks if a Participant ID has already been saved in the app. If not, it renders the setup questions.
    if (localStore.participant_id === " " || !localStore.participant_id) {app.renderQuestion(-NUMSETUPQS);}
    // And this statement says that otherwise, a new UniqueKey for a new survey submission should be generated and to go to the first survey question (0).
    else {
        uniqueKey = new Date().getTime();
        localStore.uniqueKey = uniqueKey;
        app.renderQuestion(0);
    }
    localStore.snoozed = 0;
},
    
    //This function should not be messed with. It details how the app records responses to individual questions.
recordResponse: function(button, count, type) {
    //Record date (create new date object)
         var datestamp = new Date();
         var year = datestamp.getFullYear(), month = datestamp.getMonth(), day=datestamp.getDate(), hours=datestamp.getHours(), minutes=datestamp.getMinutes(), seconds=datestamp.getSeconds();
    
         var response, currentQuestion, uniqueRecord;
         if (type == 'text') {
             response = button.val();
             
             response = response.replace(/(\r\n|\n|\r)/g, "");
             currentQuestion = button.attr('id').slice(0,-1);
         }
         else if (type == 'slider') {
         	response = button.split(/,(.+)/)[1];
             currentQuestion = button.split(",",1);
         }
    
         else if (type == 'checklist') {
             response = button.split(/,(.+)/)[1];
                       currentQuestion = button.split(",",1);
         }
         else if (type == 'instructions') {
         	response = button.split(/,(.+)/)[1];
             currentQuestion = button.split(",",1);
         }
    
         else if (type == 'mult1') {
             response = button.value;
             currentQuestion = button.id.slice(0,-1);
         }

         else if (type == 'mult2') {
             response = button.value;
             currentQuestion = button.id.slice(0,-1);
         }
         else if (type == 'datePicker') {
     		response = button.split(/,(.+)/)[1];
          	currentQuestion = button.split(",",1);
         }
         else if (type == 'dateAndTimePicker') {
     		response = button.split(/,(.+)/)[1];
          	currentQuestion = button.split(",",1);
         }
         else if (type == 'timePicker') {
     		response = button.split(/,(.+)/)[1];
          	currentQuestion = button.split(",",1);
         }
         if (count <= -1) {uniqueRecord = currentQuestion; console.log(uniqueRecord);}
         else {uniqueRecord = uniqueKey + "_" + currentQuestion + "_" + year + "_" + month + "_" + day + "_" + hours + "_" + minutes + "_" + seconds;}
      	localStore[uniqueRecord] = response;
    
    
    
    		/* THIS IS THE QUESTION LOGIC SECTION. HERE IS WHERE YOU COMMAND THE APPLICATION TO PROCEED TO QUESTIONS IN THE DESIRED ORDER/BRANCHES. */
    
    /* The general format of the question logic statements is a series of if statements. "if" means that the app checks if a certain condition, the thing written in parentheses, is true or not. If it is true, it does what is in curly brackets after the parentheses. "Else if" statements are ifs that are run if the first "if" is false. It is assumed that if the first if is true, there is no need to do anything else with question logic in this given survey. At the bottom of the question logic section, after all "if" and "else if" statements are tested, there is one final statement, an "else" statement. The "else" statement says that if all else is false, do this. An "if", a set of "else ifs" and a closing "else" should account for all necessary logical options. "If" is the first thing we try, "else if" are all possible variation options, and "else" is the catch-all if no other variable conditions are true. Something is always done if you have written an if and an else and as many else ifs as you need for your options.
     
     
     
     In This Question Logic:
     
     Each logic statement checks what "count" we are on, which is the number of the current question. These are the numbers we labeled in comments in the survey question section, where the question count starts at 0 and goes to our last question, currently number 30. It also may check which "response" is given. The response is the answer selected by a participant. Remember, in mult1 (standard multiple choice) questions the responses start at 0, in mult2 (feeling scales) questions, they range from 1-7, and in checkbox questions, they start at 1. Text questions do not have a simple response field.
     
     The "if" is whether or not we are on the last question of participant setup. If we are finished with participant setup, there is only one thing we want -- to end setup, show the last page, schedule all notifications, and send off the data. If we have reached the end of setup, there are no variables. We want only one outcome.
            
     The "else if" statements are our way of exploring all variables in the survey -- the question branches. If the question we are on is the end of the survey, we need to tell the app to show us the last page and send off data. If the question we're on isn't the end, we need to see if there is anything else special to be done while on this question. For us, these usually come in pairs to account for all options. If we're on the question that determines whether we go to the yes or no branch, count 2, we want to go to the no branch if response number 1 (the second and last response, "No") is selected. If the response is the last one, we go to the no branch. If it is less than the last one, we go to the yes branch. The pair of "else if" statements account for all possible options. The last option and all options less than the last one. The last "else if" statement near the end says that if there isn't anything special about the question we're on and the count we're on isn't the last question, then we just go to the next question and progress further into the survey. Eventually, something special will happen or we will reach the end.
     
     The "else" statment at the end of the question logic is the last line of logic that determines what to do if nothing else is true. For us, if we aren't doing setup (the "if"), we aren't on a question that has special logic, and we aren't on a question before the ends, then we have to be at the end. If nothing else is true, then we have successfully reached the end of the survey, and this else statement will display the last page of the survey and store/send off the survey data to the server. */
    
    
    
    		//This is the initial "if". It says if the count is -1 (which is what is reported if we have on the last question of participant setup) it should schedule all the notifications and schedule notifications
        if (count == -1) {app.renderLastPage(lastPage[0], count); app.scheduleNotifs();}
 
     		// This first else if is for our first special option in any survey, the snooze option. If the count is the SnoozeQ (snooze question, which was set as a variable earlier), and the response is equal to 1 (which is the answer "No" to are you able to do the study now), then we render the last page #1, which is the snooze message.
         else if (count == SNOOZEQ && response == 1) {app.renderLastPage(lastPage[1], count);}
    
    // The following are the logic questions for the standard survey questions.
    
    // This decides the YES or NO Branch. It says that if we're on question count 2 and the response is == to 1 ("No") to go to question 21, which is the first question on the no branch. If it is less than 1 (all other options, in this case, "Yes"), the survey proceeds to render question 3, the first question on the yes branch.
         else if (count == 2 & response < 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(3);});}
         else if (count == 2 && response == 1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(21);});}
    
    // Allows for a return to the YES branch if NO Branch was accidentally selected
         else if (count == 21 & response < 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(22);});}
         else if (count == 21 && response == 2) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(3);});}
    
    
    
                                        /* ---- Logic for the YES Branch ----  */
    
    
    // Y03 (First is No, Second is Yes)
         else if (count == 5 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(7);});}
         else if (count == 5 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(6);});}
    
    // Y05 (First is No, Second is Yes)
         else if (count == 7 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(9);});}
         else if (count == 7 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(8);});}
    
    // Y07 (First is No, Second is Yes)
         else if (count == 9 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(11);});}
         else if (count == 9 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(10);});}
    
    // Y09 (First is No, Second is Yes)
         else if (count == 11 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(13);});}
         else if (count == 11 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(12);});}
    
    
    // Y11 (First is No, Second is Yes)
         else if (count == 13 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(15);});}
         else if (count == 13 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(14);});}
    
    
    // Y13 (First is No, Second is Yes)
         else if (count == 15 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(17);});}
         else if (count == 15 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(16);});}
    
    
    // Y17 (First is No, Second is Yes)
         else if (count == 19 & response > 0) {app.renderLastPage(lastPage[0], count);}
         else if (count == 19 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(20);});}
    
    //This is to end the Yes Branch. Count 20 is the last question of the yes branch. If we are on this question, we want to render the lastPage 0, the standard end-of-survey last page.
         else if (count == 20) {app.renderLastPage(lastPage[0], count);}

    
                                    /* ---- Logic for the NO Branch ----  */
    
    // Questions 21-23 go in order
    
    // Asks if interacting with people, skips question about how many if "No"
    else if (count == 23 & response > 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(24);});}
    else if (count == 23 && response == 0) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(25);});}
    

    // Progresses if sought/avoided people (First is Options, Second is Other)
    else if (count == 25 & response < 4) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(26);});}
    else if (count == 25 /* && response == 4 */) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(28);});}
    
    
    // Progresses if sought/avoided activity (First is Options, Second is Other)
    else if (count == 28 & response < 4) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(29);});}
    else if (count == 28 /* && response == 4 */) {app.renderLastPage(lastPage[0], count);}
    
    
    //This is to end the No Branch. Count 30 is the last question of the yes branch. If we are on this question, we want to render the lastPage 0, the standard end-of-survey last page.
    else if (count == 30 & response < 10) {app.renderLastPage(lastPage[0], count);}
    else if (count == 30 && response == 10) {app.renderLastPage(lastPage[0], count);}
    
    
    
    // THIS IS THE ELSE IF STATEMENT THAT PUSHES US FORWARD TO TO THE NEXT QUESTION IN THE SERIES, SO LONG AS THE CURRENT QUESTION IS LESS THAN THE TOTAL NUMBER OF QUESTIONS, I.E. WE AREN'T OUT OF QUESTIONS.
    else if (count < surveyQuestions.length-1) {$("#question").fadeOut(400, function () {$("#question").html("");app.renderQuestion(count+1);});}
    
    
    
    // THIS IS THE FINAL ELSE STATEMENT THAT ENDS THE SURVEY WHEN NOTHING ELSE IS TRUE IN THE LOGIC.
    else {app.renderLastPage(lastPage[0], count);}
},
                                                                              
           /* This function handles pause events, which are events when participants leave the app and the app is paused. It should be left alone. */
pauseEvents: function() {
	localStore.pause_time = new Date().getTime();
	app.saveData();
	},
	
        /* This function handles situations when participants are locked out of submitting survey responses and for how long. It should be left alone barring one piece. */
sampleParticipant: function() {
	var current_moment = new Date();
	var current_time = current_moment.getTime();
    
	// the 600000 is the amount of time a participant is locked out of the app. This is typically encountered after completing a survey or when pressing snooze. This should be set to the time in milliseconds the participant should be locked out. In this instance, 600000 is 10 minutes in milliseconds.
	if ((current_time - localStore.pause_time) > 600000 || localStore.snoozed == 1) {
	uniqueKey = new Date().getTime();
	localStore.snoozed = 0;
	app.renderQuestion(0);
	}
	else {
	uniqueKey = localStore.uniqueKey;
	}
	app.saveData();
    },
                                                                              
 /* These functions, saveDataLastPage and saveData are responsible for saving data and sending it off to the server. DO NOT MODIFY THEM IF AVOIDABLE. THEY ARE VOLATILE AND ONLINE INSTRUCTIONS ARE NOT CORRECT. */
    
// saveDataLastPage handles communication with the server on instances where the participant is made aware of communication, specifically at the end of a survey.
saveDataLastPage:function() {
    // translates stored data to format for transmission
    var storage = JSON.stringify(localStore);
    var storage_save=JSON.parse(storage);
    $.ajax({
           type: 'get', // this is the type for the server or google option. 'get' is the google option.
           
           // this is the url of the script that processes data and writes it to our spreadsheet. It is a permanent URL assigned by Google that should not change unless the script is deleted. There is no reason to delete the script. Modifying it (which would only be needed if we wanted to change which spreadsheet it writes to) does not change the script URL.
           url: 'https://script.google.com/macros/s/AKfycby2-TH3w-Lr0y342cq6nPYX13m_UpmJfbShpyihyhpqFieg9gE8/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
           var pid = localStore.participant_id, snoozed = localStore.snoozed, uniqueKey = localStore.uniqueKey;
           localStore.clear();
           localStore.participant_id = pid;
           localStore.snoozed = snoozed;
           localStore.uniqueKey = uniqueKey;
           $("#question").html("<h3>The lab has received your Experience. Thank you for completing your report!</h3>"); // this is the message to be displayed when the server receives data successfully. You can modify the text within the <h3></h3> if desired.
           },
           error: function (request, error) {
           console.log(error);
           $("#question").html("<h3>Please try resending data. If problems persist, please contact the researchers (ledlabneu@gmail.com).</h3><br><button>Resend data</button>");
           $("#question button").click(function () {app.saveDataLastPage();}); // likewise with this message for an issue with server communication.
           },
           });
},

// saveData handles communication with the server on instances where a lastPage is not needed to be shown to a participant, such as when they open or pause the app and the server is notified.
saveData:function() {
    var storage = JSON.stringify(localStore);
    var storage_save=JSON.parse(storage);
    $.ajax({
           type: 'get',
           url: 'https://script.google.com/macros/s/AKfycby2-TH3w-Lr0y342cq6nPYX13m_UpmJfbShpyihyhpqFieg9gE8/exec',
           data: storage_save,
           crossDomain: true,
           success: function (result) {
           var pid = localStore.participant_id, snoozed = localStore.snoozed,
           uniqueKey = localStore.uniqueKey, pause_time = localStore.pause_time;
           localStore.clear();
           localStore.participant_id = pid;
           localStore.snoozed = snoozed;
           localStore.uniqueKey = uniqueKey;
           localStore.pause_time = pause_time;
           },
           error: function (request, error) {console.log(error);},
           });
},



/* THIS IS THE CODE THAT SCHEDULES NOTIFICATIONS */
 scheduleNotifs:function() {
     
        // Creates a variable, an empty array, to hold all notifications to be scheduled
     var notifs=[];
 		// Declares the number of intervals between the notifications for each day (i.e., if notifying participants 5 times, declare 5 intervals)
     var interval1, interval2, interval3, interval4, interval5;

 		// Creates a variable to represent the id of each notification for the day, therefore there should be as many variables as notifications, in this case, 5.
     var a, b, c, d, e;

 		// Creates a variable to represent new date/time to be calculated for each notification. There should be the same number of dates as intervals and variables (5).
		//That is, if there are 6 intervals, declare 6 new dates
     var date1, date2, date3, date4, date5;

 		// These variables are used by the notification scheduling functions to determine the beginning and end of the notification period, etc. depending on whether it is a weekday or weekend day.
        // Don't mess with these.
     var currentMaxHour, currentMaxMinute, currentMinHour, currentMinMinute, nextMinHour, nextMinMinute;

 		// The next three lines create variables for the present time when the notifications are being scheduled.
        // Don't mess with these.
     var dateObject = new Date();
     var now = dateObject.getTime();
     var dayOfWeek = dateObject.getDay(), currentHour = dateObject.getHours(), currentMinute = dateObject.getMinutes();

 		//The next variables represent the amount of time between the end of the data collection to the start of the next one (nightlyLag),
 		//the interval between the scheduling time and the start of the first data collection period (currentLag)
     var nightlyLag, currentLag;

 		// These represents the participant's start and stop times converted to a format appropriate for mathematic equations needed for scheduling notifications.
        // Don't mess with these.
 		var weekendSleepTime = localStore.weekendSleepTime.split(":");
 		var weekendWakeTime = localStore.weekendWakeTime.split(":");
 		var weekdaySleepTime = localStore.weekdaySleepTime.split(":");
 		var weekdayWakeTime = localStore.weekdayWakeTime.split(":");

 		// These are convenience variables for us to use below in mathematic equations while scheduling. These are used to schedule each notification within the appropriate windows. All times are stored in milliseconds.
    	var day = 86400000; // the length of a 24 hour day
     
     // the maximum window amount of time allowed during randomization of the notification schedules. This is multiplied by a randomly generated value between 0 and 1 to provide a random millisecond value between 0 seconds and 1.9 hours.
        var randomDiaryLag = 6840000;
     // this is the minimum amount of time allowed between notifications. This is 30 minutes. This, added to the random value generated with randomDiaryLag produces notification times that are between .5 and 2.4 hours apart, 1/5 of our 12-hour, 5-notification period.
        var minDiaryLag = 1800000;
     // this is a variable for a 2.4 hour space, which is multiplied and added in to schedule the 2nd-5th notifications pushed back to their respective time slots.
        var intervalWindow = 8640000;

 		//This is a loop that repeats this block of codes for the number of days there are in the experience sampling period. 10 Represents the 10 days of the study and should be changed to reflect the number of days of the study. It basically runs the code to determine a day's worth of notification times for 10 loops, or 10 days.
     for (i = 0; i < 10; i++)
     {
 		//This code uses if statements to determine whether to schedule a notification using weekday or weekend times and sets currentLag, etc..
         var alarmDay = dayOfWeek + 1 + i;
         if (alarmDay > 6) {alarmDay = alarmDay-7;}
    			if (alarmDay > 6) {alarmDay = alarmDay - 7;}
    			if (alarmDay == 0 || alarmDay == 6) {
    				currentMaxHour = weekendSleepTime[0];
    				currentMaxMinutes = weekendSleepTime[1];
    				currentMinHour = weekendWakeTime[0];
    				currentMinMinutes = weekendWakeTime[1];
    				if (alarmDay == 0) {
    					nextMinHour = weekdayWakeTime[0];
    					nextMinMinutes = weekdayWakeTime[1];
    				}
    				else {
    					nextMinHour = weekendWakeTime[0];
    					nextMinMinutes = weekendWakeTime[1];
    				}
    				currentLag = (((((24 - parseInt(currentHour) + parseInt(weekendWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekendWakeTime[1]))*60)*1000);
 				
    			}
    			else {
    				currentMaxHour = weekdaySleepTime[0];
    				currentMaxMinutes = weekdaySleepTime[1];
    				currentMinHour = weekdayWakeTime[0];
    				currentMinMinutes = weekdayWakeTime[1];
    				if (alarmDay == 5) {
    					nextMinHour = weekendWakeTime[0];
    					nextMinMinutes = weekendWakeTime[1];
    				}
    				else {
    					nextMinHour = weekdayWakeTime[0];
    					nextMinMinutes = weekdayWakeTime[1];
    				}
                 currentLag = (((((24 - parseInt(currentHour) + parseInt(weekdayWakeTime[0]))*60) - parseInt(currentMinute) + parseInt(weekdayWakeTime[1]))*60)*1000);
    			}
    			if (alarmDay == 5 || alarmDay == 0) {nightlyLag = currentLag;}
    			else {
             	nightlyLag= (((((24 - parseInt(currentHour) + parseInt(nextMinHour))*60) - parseInt(currentMinute) + parseInt(nextMinMinutes))*60)*1000);
    			}

         
 			/* This part of the code calculates how much time there should be between the questionnaires and when they should be scheduled, using all of the variables above. 
             The first interval is scheduled by taking the start time for the weekday or weekend day (currentLag, which is determined above) then adding in the minDiaryLag (.5 hours) and the randomization of randomDiaryLag (0-1 * 1.9 hours) to determine where in the 2.4 hour interval the first notification will occur. Finally, "day*i" adds in a day's worth of milliseconds * the number the loop is on. This adds a day for each loop, meaning each successive loop schedules notifications for the next day, resulting in 50 notifications scheduled across 10 days.
             
             The second-fifth intervals are all scheduled in the same way, but they also include an addition of intervalWindows, which displace the scheduling by 2.4 hours. This causes all 5 notifications to stay within their respective, randomized 2.4 hour windows in the 12 hour day. */
         
         interval1 = parseInt(currentLag) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
         interval2 = (currentLag + intervalWindow) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
         interval3 = (currentLag + (intervalWindow * 2)) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
         interval4 = (currentLag + (intervalWindow * 3)) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;
         interval5 = (currentLag + (intervalWindow * 4)) + (parseInt(Math.round(Math.random()*randomDiaryLag)+minDiaryLag)) + day*i;

    
 			//This part of the code calculates a unique ID for each notification for the operating systems.
         a = 101+(parseInt(i)*100);
         b = 102+(parseInt(i)*100);
         c = 103+(parseInt(i)*100);
         d = 104+(parseInt(i)*100);
         e = 105+(parseInt(i)*100);


 			// This uses the current date and the mathematically generated intervals to find the realtime notification times.
         date1 = new Date(now + interval1);
         date2 = new Date(now + interval2);
         date3 = new Date(now + interval3);
         date4 = new Date(now + interval4);
         date5 = new Date(now + interval5);
         
 			// This schedules the notifications. It pushes all the properties into the notif array variable from earlier.
         	notifs.push({id: a, at: date1, text: 'Time for your next Experience report!', title: 'Experience'});
         	notifs.push({id: b, at: date2, text: 'Time for your next Experience report!', title: 'Experience'});
            notifs.push({id: c, at: date3, text: 'Time for your next Experience report!', title: 'Experience'});
         	notifs.push({id: d, at: date4, text: 'Time for your next Experience report!', title: 'Experience'});
         	notifs.push({id: e, at: date5, text: 'Time for your next Experience report!', title: 'Experience'});

 			// This records when the notifications are scheduled for and sends it to the server.
         	localStore['notification_' + i + '_1'] = localStore.participant_id + "_" + a + "_" + date1;
         	localStore['notification_' + i + '_2'] = localStore.participant_id + "_" + b + "_" + date2;
         	localStore['notification_' + i + '_3'] = localStore.participant_id + "_" + c + "_" + date3;
         	localStore['notification_' + i + '_4'] = localStore.participant_id + "_" + d + "_" + date4;
         	localStore['notification_' + i + '_5'] = localStore.participant_id + "_" + e + "_" + date5;
     }
     
     // This sends the notifications we've constructed to the operating system.
     cordova.plugins.notification.local.schedule(notifs);
 },

// this is the small function that is called to write an individual notification to the participant if they snooze the app. The 600 is the number of seconds being multiplied to milliseconds. Currently, it is set to create a notification 10 minutes after hitting snooze.
snoozeNotif:function() {
     var now = new Date().getTime(), snoozeDate = new Date(now + 600*1000);
     var id = '99';
     cordova.plugins.notification.local.schedule({
                                          icon: 'ic_launcher',
                                          id: id,
                                          title: 'Experience',
                                          text: 'Snooze Alert! Please report your Experience now!',
                                          at: snoozeDate,
                                          });
},
//This function forces participants to respond to an open-ended question text question if they have left it blank.
	validateResponse: function(data){
	var text = data.val();
	//         console.log(text);
	if (text === ""){
			return false;
		} else { 
			return true;
		}
	},     
	};
