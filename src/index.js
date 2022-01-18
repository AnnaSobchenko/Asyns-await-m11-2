import './sass/main.scss';

const baseUrl = 'http://localhost:3000';

async function reqServer(url, method = 'GET', data = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  if (method !== 'GET' && method !== 'DELETE') {
    options.body = JSON.stringify(data);
  }
  const responce = await fetch(baseUrl + url, options);
  return responce.json();
}
reqServer('/posts').then(data => console.log(data));

const refs = {
  listNode: document.querySelector('.post-list'),
  form: document.querySelector('#create-post'),
};

async function renderPostList() {
  const data = await reqServer('/posts').then(data => {
    const markup = data
      .map(
        post => `<li data-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.text}</p>
        <button data-action="del">DELETE</button> 
        <button data-action="edit">EDIT</button>
        <div>
        <span class="like" data-actio="like">&#128077;${post.like}</span>
        <span class="dislike" data-action="dislike">&#128078;${post.dislike}</span></div>
        <small> ${post.author}</small></p></li>`,
      )
      .join('');
    refs.listNode.innerHTML = markup;
  });
}

renderPostList();
refs.listNode.addEventListener('click', async e => {
  if (e.target.nodeName !== 'SPAN') return;
  const id = e.target.closet('li').dataset.id;
  if (e.target.dataset.action === 'like') {
    await reqServer(`/posts/${id}`, 'PATCH', { like: Number(e.target.textContent) + 1 });
    e.target.textContent = Number(e.target.textContent) + 1;
  }
});

refs.listNode.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') return;
  const id = e.target.closest('li').dataset.id;
  if (e.target.dataset.action === 'edit') {
    const data = await reqServer('/posts/' + id);
    refs.form.elements.text.value = data.text;
    refs.form.elements.author.value = data.author;
    refs.form.elements.title.value = data.title;
    // refs.form.elements.title.value = data.like;
    // refs.form.elements.title.value = data.dilike;
    refs.form.elements.id.value = data.id;
  }
  if (e.target.dataset.action === 'del') {
    if (confirm('Are your sure?')) {
      await reqServer('/posts/' + id, 'DELETE');
      renderPostList();
    }
  }
});

refs.form.addEventListener('keydown', async e => {
  if (e.code === 'Enter' && e.shiftKey) {
    refs.form.elements;
    const data = {
      text: refs.form.elements.text.value,
      author: refs.form.elements.author.value,
      title: refs.form.elements.title.value,
    };
    const updateForm = data => {
      refs.form.reset();
      refs.form.elements.id.value = '';
      renderPostList();
    };
    const id = refs.form.elements.id.value;

    if (id === '') {
      data.like = 0;
      data.dislike = 0;
      await reqServer('/posts', 'POST', data);
    } else {
      await reqServer(`/posts/${id}`, 'PATCH', data);
    }
  }
});
