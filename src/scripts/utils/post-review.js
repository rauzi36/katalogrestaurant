import RestoDbSource from '../data/restodb-source';
import UrlParser from '../routes/url-parser';

const PostReview = async () => {
  const url = UrlParser.parseActiveUrlWithoutCombiner();
  const inputReviewName = document.getElementById('inputName');
  const inputReview = document.getElementById('inputReview');
  const reviewContainer = document.querySelector('.detail-review');

  if (!inputReviewName.value || !inputReview.value) {
    // eslint-disable-next-line no-alert
    alert('Nama dan ulasan tidak boleh kosong!');
    return;
  }

  const dataInput = {
    id: url.id,
    name: inputReviewName.value,
    review: inputReview.value,
  };

  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const newReview = `
    <div class="detail-review-item">
      <div class="header-review">
        <p class="name-review"><i title="restaurant" class="fa fa-user-circle" style="font-size:1.3em; padding-right:10px;"></i>${dataInput.name}</p>
        <p class="date-review">${date}</p>
      </div>
      <div class="body-review">
        ${dataInput.review}
      </div>
    </div>
  `;

  try {
    await RestoDbSource.postReview(dataInput);
    reviewContainer.innerHTML += newReview;
    inputReviewName.value = '';
    inputReview.value = '';
  } catch (error) {
    console.error('Gagal mengirim ulasan:', error);
    // eslint-disable-next-line no-alert
    alert('Gagal mengirim ulasan. Silakan coba lagi.');
  }
};

export default PostReview;
