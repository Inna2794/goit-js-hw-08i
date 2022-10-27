import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form';
const refs = {
  form: document.querySelector('.feedback-form'),
  message: document.querySelector('textarea[name="message"]'),
  email: document.querySelector('input[name="email"]'),
};
const data = {};
const onInput = e => {
  // data[e.target.name] = e.target.value;
  data.email = refs.email.value;
  data.message = refs.message.value;
  const inputJson = JSON.stringify(data);
  localStorage.setItem(STORAGE_KEY, inputJson);
};
const onFormSubmit = e => {
  e.preventDefault();
  if (!data.email || !data.message) {
    alert('Fill in all the fields');
    return;
  }
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  e.target.reset();
  delete data.message;
  delete data.email;
  localStorage.removeItem(STORAGE_KEY);
};
function populateMessageOutput() {
  const savedMsg = localStorage.getItem(STORAGE_KEY);
  if (savedMsg) {
    const newData = JSON.parse(savedMsg);
    refs.email.value = newData.email || '';
    refs.message.value = newData.message || '';
  }
}
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));
populateMessageOutput();
