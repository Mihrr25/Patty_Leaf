import React from 'react'
import Corousel from './corousel'
import { Link, useNavigate, redirectDocument, json } from 'react-router-dom'
const rightHome = () => {
  return (
    <div className="right-home">
      <Corousel/>
      <div className="getStarted">
        {/* Get Started button */}
        <Link to="/orderFood"><button>Get Started</button></Link>
      </div>
      <article>
        {/* Introduction */}
        <div className="homePageAbt">
          <p>
            Established in 1950, Patty Leaf has been a cornerstone of culinary excellence in our community for
            over seven decades. Nestled in the heart of Delhi, our restaurant has earned a reputation for its
            unwavering commitment to quality and flavor, rooted in a rich history of family recipes and a
            passion for hospitality.<br /><br />
            At Patty Leaf, we believe in celebrating the art of cooking with the freshest ingredients sourced
            locally, ensuring each dish bursts with authentic flavors. Our menu showcases a fusion of
            traditional and contemporary cuisines, offering a diverse range of options that cater to every
            palate. Whether you're craving a hearty homemade burger, a delicate salad bursting with seasonal
            produce, or our signature Patty Leaf specialty, every dish is crafted with meticulous attention to
            detail.<br /><br />
            Beyond our delicious fare, Patty Leaf embodies a warm and inviting atmosphere that welcomes guests
            as part of our extended family. Our commitment to exceptional service ensures that every dining
            experience is memorable, whether you're here for a casual lunch, a celebratory dinner, or a special
            occasion.<br /><br />
            Join us at Patty Leaf, where passion meets plate, and every meal tells a story of heritage and
            culinary mastery. Discover why generations of diners have made us their preferred dining destination
            since 1950.
          </p>
          {/* Additional paragraphs */}
        </div>
      </article>
      <hr className="hr1" />
      {/* Feedback */}
      <article>
        <div className="homePageFeedback">
          <div className="homePageFeedLeft">
            <div className="homePageFeedTop">
              <span className="homePageFeedName">Mihir Bairathi</span>
              <span className="homePageFeedDate">January 24, 2024</span>
            </div>
            <div className="homePageFeedSec">
              <span className="homePageFeedsStars">★★★★★</span>
            </div>
            <div className="homePageFeedText">
              <p>
                Visiting Patty Leaf was an absolute delight! From the moment we stepped in, we were warmly
                welcomed by the friendly staff. The ambiance was cozy yet elegant, perfect for a special
                evening out.<br /><br />
                The menu offered a delightful variety of dishes, each bursting with flavor and beautifully
                presented. We particularly enjoyed the [specific dish] which was cooked to perfection. The
                ingredients were fresh, and the portions were generous.<br /><br />
                The service was impeccable. Our server was knowledgeable and attentive, making excellent
                recommendations and ensuring that we had everything we needed throughout our meal.<br /><br />
                Overall, Patty Leaf exceeded our expectations in every way. It's clear that the team takes
                great pride in delivering a top-notch dining experience. We will definitely be returning and
                recommending it to friends and family. Thank you for a memorable evening!
              </p>
            </div>
          </div>
          <div className="homePageFeedRight">
            <img src="https://images.stockcake.com/public/0/a/d/0ada3b02-22eb-4c08-a81e-df389bdd88a6_large/delicious-burger-held-stockcake.jpg" alt="" />
          </div>
        </div>
        <hr className="hr1" />
        {/* Additional Feedback sections */}
        <div className="homePageFeedback">
          <div className="homePageFeedLeft">
            <div className="homePageFeedTop">
              <span className="homePageFeedName">Mihir Bairathi</span>
              <span className="homePageFeedDate">January 24, 2024</span>
            </div>
            <div className="homePageFeedSec">
              <span className="homePageFeedsStars">★★★★★</span>
            </div>
            <div className="homePageFeedText">
              <p>
                Visiting Patty Leaf was an absolute delight! From the moment we stepped in, we were warmly
                welcomed by the friendly staff. The ambiance was cozy yet elegant, perfect for a special
                evening out.<br /><br />
                The menu offered a delightful variety of dishes, each bursting with flavor and beautifully
                presented. We particularly enjoyed the Spinach and Corn Burger which was cooked to perfection. The
                ingredients were fresh, and the portions were generous.<br /><br />
                The service was impeccable. Our server was knowledgeable and attentive, making excellent
                recommendations and ensuring that we had everything we needed throughout our meal.<br /><br />
                Overall, Patty Leaf exceeded our expectations in every way. It's clear that the team takes
                great pride in delivering a top-notch dining experience. We will definitely be returning and
                recommending it to friends and family. Thank you for a memorable evening!
              </p>
            </div>
          </div>
          <div className="homePageFeedRight">
            <img src="https://images.stockcake.com/public/0/a/d/0ada3b02-22eb-4c08-a81e-df389bdd88a6_large/delicious-burger-held-stockcake.jpg" alt="" />
          </div>
        </div>
        <hr className="hr1" />
        {/* Additional Feedback sections */}
        <div className="homePageFeedback">
          <div className="homePageFeedLeft">
            <div className="homePageFeedTop">
              <span className="homePageFeedName">Mihir Bairathi</span>
              <span className="homePageFeedDate">January 24, 2024</span>
            </div>
            <div className="homePageFeedSec">
              <span className="homePageFeedsStars">★★★★★</span>
            </div>
            <div className="homePageFeedText">
              <p>
                Visiting Patty Leaf was an absolute delight! From the moment we stepped in, we were warmly
                welcomed by the friendly staff. The ambiance was cozy yet elegant, perfect for a special
                evening out.
              </p>
            </div>
          </div>
          <div className="homePageFeedRight">
            <img src="https://images.stockcake.com/public/0/a/d/0ada3b02-22eb-4c08-a81e-df389bdd88a6_large/delicious-burger-held-stockcake.jpg" alt="" />
          </div>
        </div>
        <hr className="hr1" />
        {/* Additional Feedback sections */}
      </article>
      {/* Footer */}
      <footer>
        All rights reserved © 2024 Patty Leaf Restaurant. Designed with passion.
      </footer>
    </div>
  )
}

export default rightHome