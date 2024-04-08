"use client"
import React from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import '../../css/swiper_css.css';
// import required modules
import {Autoplay, Navigation} from 'swiper/modules';
import {Card, CardMedia, Typography} from "@mui/material";

export const SwiperShow = ({data, link}) => {
  return (
   <>
     <Swiper
      slidesPerView={3}
      spaceBetween={10}
      navigation={true}
      autoplay
      modules={[Autoplay, Navigation]}
      breakpoints={
        {
          300: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 2,
          }, 1000: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }
      }
      
      
      className="mySwiper"
     >
       {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Card sx={{borderRadius: '20px'}}>
            <CardMedia component={'img'} src={item?.image?.scr}/>
          </Card>
          {link ? (
           <Typography component={'a'} href={`/shop/${item.slug}`} variant="h5" color={'#000'}>
             {item.name}
           </Typography>
          ) : (
           <Typography variant="h5" component="h2" fontWeight={700}>
             {item.name}
           </Typography>
          )}
        </SwiperSlide>
       ))}
     
     </Swiper>
   </>
  )
}