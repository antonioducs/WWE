import firebase from 'firebase';


export const USER_LOGIN_SUCESS = 'USER_LOGIN';
const userLoginSucess = user => ({
  type: USER_LOGIN_SUCESS,
  user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
  type: USER_LOGOUT,
})


export const SET_FIELD_USER = 'SET_FIELD_USER';
export const setFieldUser = (field, value) => {
  return {
    type: SET_FIELD_USER,
    field,
    value
  }
}

export const SAVE_USER_SUCESS = 'SAVE_USER_SUCESS'
export const saveUserSucess = user => {
  return {
    type: SAVE_USER_SUCESS,
    user
  }
}

export const processLogin = () => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .once('value')
      .then(function (snapshot) {
        dispatch(userLoginSucess(snapshot.val()));
      })
  }
}

export const newUser = () => {

  const { currentUser } = firebase.auth();

  const user = {
    name: "Seu nome",
    photo: "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAADCwsL8/Pzo6Oj39/fOzs5aWlp6enr5+fmIiIgSEhLY2Njr6+tKSkomJiY+Pj6AgIA1NTWdnZ2vr69hYWFwcHBDQ0Ojo6MXFxfi4uK1tbW/v7+Ojo6pqana2tpOTk4rKyseHh5VVVVqamqUU2yeAAAFiElEQVR4nO2diZaiMBBFCQFFBcWlFbVdp///G0ekHR0FZUm9Cpy6X5B3QqoqqQXHEQRBEARBEARBaA364CbL/ng2GanRZDbuLxP3oLkXZQrtfQfxWr2yjoNv7yKz3Up9dzrLEXdnNnUH3Iusx3VjwuHkrbyMyTDkXm0NLgL9pIy8X5GJz73iykTzUWl9KaN5xL3k8lz2L9pVkpexa5HGRbX9+7ePC+6Fl+Tw3nq+Y3bgXvxHtDMIautLCXzbHWRYfwN/t7HHLeE9i4b6Umw+jf6PAYFK/fiOtvNL9WIjApWKPW4p+Wzq+Yg8RhtuMXmEefeHuqxD+0xqaFBfinXRuGmB1kn0jAtUyrPJokYnAoUnmywqhcCLRHu2sFkoWkzALezGlkigUltuaRkbMoFKWeH5B2NChSsbHuKGhAKVGnLLo/GEj/C7jCOxwiO3QDo7eoPZnuozucIzr9838WrxCdZXjcEJoPDE6TH2AIFK7RkVls+9NGHCJ/AbIlCpbzaFXyCFX1wCqcOZO1yBzRymcM6k0NQD8GdiHoGU98JneO6JiHjmBk9cg7KkKSzW1DeXpvjMiKNWowcUqBRH3hTnK1I4/EUfqrDPoBDnDVMYPKJvMl34mTXe1OCC0gx8aIo1pRzGFHO9v4O/6GOdBYe7qFN92IQdXCFtuuIVfAKDKitaBD5bugQrXIpC43T/K52CFU7hCrtvS7vvD7sf0yBf2lLwr23mixHfgy9VjMAK8Q01+gQVOGHI5q+gCld4geCwDR+0abAx5UhcIFNPPMkn3bTDqQozlrIhZOyNj7tTUJUYKTzVGD5QIVMjNC5FylVugvtMuUqGYFlglgzwFdQ9n6/Y+wBSyNjhjckDc+R/b2BSbKzd3QiHwVaZeAXxlsHcoE9/EvvMDcH05pR9VAb1y/COvVdW01adnHnVXaGNTvmK2B+gjN2GVswd0HTviisb9DmUb1JWNMmmUB1FKw5hBs2jFM/zUwEUWX1ruvEzzIfgacBtiaG5ok0HqH9sUndFm215Plon8IKZMVgZP9xi8jFnbiwzMndM3TN2dtmYR8y4/ouj574xFeM3j1FXlg9r1U0rieY2TDN5T69Jq0ls+VzIjAbbyNUNW5moXp3GMrLXhr6wqe4bg02L9KV41TQG/JN2KnLZDS8pa3PipHX6bt9bWOZqPLVsQmJVeslXcap41E9a4R6KyXbS782n4+dhROfxdN6zPHyphh+F7naxT+bJfrF1w8j+0EUQBEEQBEEQBFIG3ibs9Vw8vV648ciuJNlFL3L3QZ9+6uw7zv1g79J06kXbgFfbI+dga1ill2B78cpg6Pkq/TqjLeXU9SYcrzvZ9JHV3yEnz1VltGvy1HPdP/TohOpMm5xIHz04oR7D2vuYcC+9NEmt03ignphvkmPVWmmNn3vRlGrVDdrxbXUQxRzLn0aNbQ81R9liTY2fPWOKsj1uGj0Cyhxl5hJo9GBSs5RpczNQ88PJ53qjlgv8LFH/4V5hYz6U3iJndFPxtl8RPWaOhkKLquHzu6iYFwVw6OFWdBTUr/jIcSy0zPINaps9/TO5nh89+piWnMHK6Plr1Ly+3rQ33M7nxWWgB5DT81QwR9gHysVT/2m3zEzG/tHva8wP1LD897s2+j9RcvD490vs3zhQxF3fwsdN7J4hzfg3ErRr4cydW2DTlWvhK79dRtAhllhi3dGA7U4Wutmf5q3PtNOWNCXutiVNSa2py70IUtyOH8PsIHYzJr1xOYgDmwuCmjMagMdy49l03NCkpqaL7xeP7DtuSlNj2qW3/Dz6TvtKg6oxdrp7dcqYOV18R3xk4mB/CYtn7XCvgBxR2H5EYfsRhe1HFLYfUdh+RGH7EYXt56W+TRAEQRAEQRAEoQZ/AdsCgYlEiqO4AAAAAElFTkSuQmCC",
    apt: "",
    rfid: "",
    horarios: [{}],
    isAdmin: false
  }

  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .set(user);

    dispatch(userLoginSucess(user));
  }
}

export const saveUser = user => {

  const { currentUser } = firebase.auth();

  if(!user.isAdmin) user.isAdmin = false;

  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        await firebase
          .database()
          .ref(`users/${currentUser.uid}`)
          .set(user)

        dispatch(saveUserSucess(user));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    })
  }
}