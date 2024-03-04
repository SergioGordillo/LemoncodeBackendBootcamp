use('listingsAndReviews');
db.listingsAndReviews.find({
    'address.country': 'Spain',
  });
use('listingsAndReviews');
db.listingsAndReviews.find(
    { 'address.country': 'Spain' }, 
    { _id: 1, 'address.country': 1 }
);

use('listingsAndReviews');
db.listingsAndReviews
  .find(
    {
      'address.country': 'Spain',
    },
    {
      _id: 0,
      name: 1,
      price: 1,
      beds: 1,
      city: '$address.market',
    }
  )
  .limit(10)
  .sort({ price: 1 })