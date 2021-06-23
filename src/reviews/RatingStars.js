export default function RatingStars({rating}) {
    let stars = [];
    for (let i=0; i<rating; i++) {
        stars.push(" ⭐ ")
    }

    return stars
}