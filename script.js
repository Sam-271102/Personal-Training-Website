var currentProgram = '';
var currentDay = '';
var currentWorkouts = [];
var customizedWorkouts = {};

var workouts = {
    muscleGain: {
        title: 'Muscle Gain Program',
        days: {
            Monday: ['Bench Press', 'Incline Press', 'Dumbbell Fly', 'Crossover', 'Dips', 'Push-ups'],
            Tuesday: ['Pull-ups', 'Lat Pulldown', 'Seated Row', 'Deadlift', 'Bent-over Row', 'Reverse Fly'],
            Wednesday: ['Shoulder Press', 'Lateral Raise', 'Front Raise', 'Face Pull', 'Shrugs', 'Arnold Press'],
            Thursday: ['Rest Day'],
            Friday: ['Bicep Curl', 'Tricep Extension', 'Hammer Curl', 'Skull Crushers', 'Chin-ups', 'Pushdowns'],
            Saturday: ['Squats', 'Lunges', 'Leg Press', 'Deadlift', 'Leg Curl', 'Calf Raise']
        }
    },
    weightLoss: {
        title: 'Weight Loss Program',
        days: {
            Monday: ['Cardio', 'Mountain Climbers', 'Plank', 'High Knees', 'Burpees', 'Sit-ups'],
            Tuesday: ['HIIT Circuits', 'Jump Rope', 'Push-ups', 'Crunches', 'Russian Twists', 'Jump Squats'],
            Wednesday: ['Push-ups', 'Pull-ups', 'Tricep Dips', 'Plank Rows', 'Shoulder Taps', 'Push Press'],
            Thursday: ['Active Recovery: Walking or Yoga'],
            Friday: ['Squats', 'Lunges', 'Step-ups', 'Glute Bridge', 'Deadlifts', 'Calf Raise'],
            Saturday: ['Full Body Circuit', 'Burpees', 'Jumping Jacks', 'Mountain Climbers', 'Push-ups', 'Sit-ups']
        }
    }
};

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.remove('fade-in');
    });
}

function goHome() {
    hideAllPages();
    const homePage = document.getElementById('home-page');
    homePage.classList.add('active');
    homePage.classList.add('fade-in');
}

function showProgram(program) {
    currentProgram = program;
    hideAllPages();
    const programPage = document.getElementById('program-page');
    programPage.classList.add('active');
    programPage.classList.add('fade-in');
    
    document.getElementById('program-title').textContent = workouts[program].title;

    var dayList = document.getElementById('day-list');
    dayList.innerHTML = '';
    Object.keys(workouts[program].days).forEach(day => {
        var li = document.createElement('li');
        li.textContent = day;
        li.onclick = () => showWorkout(day, workouts[program].days[day]);
        dayList.appendChild(li);
    });
}

function showWorkout(day, workoutList) {
    currentDay = day;
    currentWorkouts = workoutList;

    hideAllPages();
    const workoutPage = document.getElementById('workout-page');
    workoutPage.classList.add('active');
    workoutPage.classList.add('fade-in');
    
    document.getElementById('workout-day').textContent = day;

    var list = document.getElementById('workout-list');
    list.innerHTML = '';
    workoutList.forEach(workout => {
        var li = document.createElement('li');
        var workoutName = document.createElement('span');
        workoutName.textContent = `${workout} - 3 sets x 12 reps`;

        var button = document.createElement('button');
        button.textContent = 'Customize';
        button.onclick = () => openPopup(workoutName, workout);

        li.appendChild(workoutName);
        li.appendChild(button);
        list.appendChild(li);
    });
}

function openPopup(workoutNameElement, workout) {
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
    popup.classList.add('fade-in');
    popup.dataset.workout = workout;
    popup.dataset.target = workoutNameElement;
}

function saveCustomization() {
    var sets = document.getElementById('sets').value;
    var reps = document.getElementById('reps').value;
    var workout = document.getElementById('popup').dataset.workout;

    customizedWorkouts[workout] = `${sets} sets x ${reps} reps`;
    document.getElementById('popup').dataset.target.textContent = `${workout} - ${sets} sets x ${reps} reps`;

    closePopup();
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('fade-in');
    popup.classList.add('hidden');
}

function finishWorkout() {
    var summary = document.getElementById('summary-list');
    summary.innerHTML = '';

    currentWorkouts.forEach(workout => {
        var li = document.createElement('li');
        li.textContent = `${workout} - ${customizedWorkouts[workout] || '3 sets x 12 reps'}`;
        summary.appendChild(li);
    });

    hideAllPages();
    const finishPage = document.getElementById('finish-page');
    finishPage.classList.add('active');
    finishPage.classList.add('fade-in');
}
