import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { GiBeachBag } from "react-icons/gi";
import { appStore, googlePlay } from "../../../assets/images";
import { useTranslation } from "react-i18next";

const socialMediaIcons = [
  { name: "Twitter", icon: <TwitterIcon />, link: "#", hoverColor: "#1DA1F2" },
  {
    name: "Instagram",
    icon: <InstagramIcon />,
    link: "#",
    hoverColor: "#DD2A7B",
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    link: "#",
    hoverColor: "#005b8e",
  },
];

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const helpSupp = [
    t("help_center"),
    t("refund_policy"),
    t("terms_conditions"),
    "+12 534 565 896",
    "info@xtramarket.com",
  ];

  const shopWith = [
    t("careers"),
    t("your_account"),
    t("become_affiliate"),
    t("fulfillment_by_xtra"),
    t("advertise_your_products"),
  ];

  const useOurApp = [
    { name: "App Store", img: appStore },
    { name: "Google Play", img: googlePlay },
  ];

  return (
    <Box
      component="footer"
      dir="ltr"
      sx={{
        bgcolor: "rgb(241, 242, 246)",
        borderRadius: "80px 80px 0 0",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          direction={isSmallScreen ? "column" : "row"}
          alignItems={isSmallScreen ? "center" : "flex-start"}
          justifyContent={isSmallScreen ? "center" : "space-between"}
          textAlign={isSmallScreen ? "center" : "left"}
        >
          {/* Logo Section */}
          <Grid item xs={12} md={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <GiBeachBag className="text-[#284980] text-[50px] cursor-pointer" />
              <Typography
                dir="auto"
                variant="h5"
                fontWeight="bold"
                color="#284980"
              >
                <span style={{ color: "#f8c530" }}>Excellence</span> Furas
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                {socialMediaIcons.map((social) => (
                  <IconButton
                    key={social.name}
                    href={social.link}
                    sx={{ mx: 1 }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Help & Support */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              className="text-[#284980]"
              fontWeight="bold"
            >
              {t("help_support")}
            </Typography>
            {helpSupp.map((item, index) => (
              <Typography
                key={index}
                dir="auto"
                className="text-[#4866c1]"
                variant="body2"
                mt={1}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Shop With Us */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              className="text-[#284980]"
              fontWeight="bold"
            >
              {t("shop_with_us")}
            </Typography>
            {shopWith.map((item, index) => (
              <Typography
                key={index}
                dir="auto"
                variant="body2"
                className="text-[#4866c1]"
                mt={1}
              >
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Use Our App */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              className="text-[#284980]"
              fontWeight="bold"
            >
              {t("use_our_app")}
            </Typography>
            {useOurApp.map((app) => (
              <Box key={app.name} mt={2}>
                <img src={app.img} alt={app.name} style={{ width: "120px" }} />
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box
          mt={3}
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          textAlign={isSmallScreen ? "center" : "left"}
        >
          <Typography dir="auto" variant="body2" color="textSecondary">
            XTRA Shop © {new Date().getFullYear()} {t("all_rights_reserved")}
          </Typography>
          <Button onClick={() => navigate("/orders")}>
            <Link sx={{ display: "flex", alignItems: "center" }}>
              <ShoppingCartIcon sx={{ mr: 1 }} /> {t("track_your_orders")}
            </Link>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
