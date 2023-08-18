import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";

// TODO: add skip button to create an initial about page
export default function () {
  return (
    <Box
      sx={{
        bgcolor: "#F1F0E8",
        border: 1,
        borderColor: "#F1F0E8",
      }}
    >
      <NavigationBar></NavigationBar>
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "6vh",
          paddingRight: "47vh",
          textAlign: "right",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        <a
          href="/username"
          style={{ textDecoration: "underline", color: "#96B6C5" }}
        >
          → start
        </a>
      </p>
      <h1
        style={{
          color: "#96B6C5",
          textAlign: "center",
          fontFamily: "Gloria Hallelujah",
          fontSize: "32px",
        }}
      >
        What is Story of Hands?
      </h1>
      <p
        style={{
          color: "#96B6C5",
          paddingLeft: "47vh",
          paddingRight: "47vh",
          paddingTop: "2vh",
          paddingBottom: "50vh",
          textAlign: "left",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
          backgroundColor: "#F1F0E8",
        }}
      >
        Hands are interesting entities. They can hold babies. We gesture using
        them. Hell, we have a couple dozen emojis just for hand(s). You can tell
        a lot by looking at a person's hands. Wrinkled hands indicate old age,
        seasoned hands indicate labor. Some fingers look so long and untouched
        it's serene. Our hands tell stories. <br></br>
        <br></br>
        That's the inspiration of this project, Story of Hands. Unsurprisingly,
        artists appreciate hands all the time. It's actually a very hard task to
        draw hands. <br></br>
        <br></br>
        Since you're here, you're probably ready for this experience. In a
        couple of steps, you'll be asked to either pick a few different line
        drawings of hands to try to form a story, or choose to see a series of
        those drawings that other strangers have picked and try to come up with
        a story. If you choose the former, then you can either choose to share a
        link to your friends or family and ask them to try to come up with what
        your series of drawing is about, or "put it up" for other strangers to
        answer. Later, you'll be asked to fill in an email so that we can send
        other people's responses to you. If you wrote an answer to a stranger's
        drawings, they'll see your answers and your username, but won't be able
        to know who you really are. You can do this as many times as you like.
        <br></br>
        <br></br>
        After you're done, you'll be asked to create an account, but this is
        just to keep all of your history, and there's no pressure at all to
        actually go through with it. Just a reminder -- you will lose the
        history if you choose not to create an account, but you can also
        screenshot, or do whatever else you like. <br></br>
        <br></br>
        And viola! That's everything I have to say. If you have any questions,
        you can come back to this page at anytime by clicking "About" on the top
        right corner. If you have any feedback or questions for me, I'm more
        than happy to hear from you! My email is tianyi437@gmail.com, feel free
        to shoot a message. <br></br>
        <br></br>
        This experience is created by Alex (Tianyi) Ma, a lover of art and
        coding.
      </p>
    </Box>
  );
}
