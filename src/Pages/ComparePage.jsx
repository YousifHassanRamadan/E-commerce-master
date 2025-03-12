import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { X, Check } from "lucide-react";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ComparePage = () => {
  const { t } = useTranslation();
  const [checkEmpty, setcheckEmpty] = useState(true);

  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  const handleRemoveFromCompare = (id) => {};
  return (
    <div className="w-full mt-[5%]">
      <div className="wishlist flex justify-center items-center mb-16">
        <div className="text">
          <p className="flex justify-center text-4xl font-bold text-[#424a63]">
            {t("compareProducts")}
          </p>
          <p className="text-[#aeb1bb] text-xl mt-2">
            {t("compareDescription")}
          </p>
        </div>
      </div>

      {checkEmpty ? (
        <div>
          {" "}
          {/* <Box
            sx={{
              mt: { xs: 4, sm: 6, md: 2 },
              mb: 12,
            }}
          >
            {comparedItems.length === 0 ? (
              <Box
                sx={{
                  maxWidth: 1200,
                  margin: "auto",
                  padding: 3,
                  mt: 10,
                  mb: 20,
                }}
              >
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Typography
                    variant="h5"
                    fontWeight={"bold"}
                    fontSize={"36px"}
                    gutterBottom
                  >
                    {t("yourCompareListIsEmpty")}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", mt: 8 }}>
                  <Button
                    variant="contained"
                    startIcon={<KeyboardArrowLeftIcon />}
                    onClick={() => handleNav("/watches")}
                    sx={{
                      textTransform: "none",
                      borderRadius: 10,
                      bgcolor: "#0088ff",
                      px: { xs: 2, sm: 3, md: 4 },
                      mx: 2,
                      py: { xs: 0.5, sm: 0.75, md: 1 },
                      fontWeight: "bold",
                      fontSize: { xs: "12px", sm: "13px", md: "14px" },
                      "&:hover": {
                        bgcolor: "black",
                      },
                    }}
                  >
                    {t("returnToShop")}
                  </Button>
                </Box>
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("product")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <Box
                            sx={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            <img
                              src={watch.image}
                              alt={watch.name}
                              style={{ width: 100, height: 100 }}
                            />
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: -15,
                                left: "50%",
                                transform: "translateX(-50%)",
                                bgcolor: "red",
                                color: "white",
                                transition: "all 0.3s ease",
                                ":hover": {
                                  bgcolor: "red",
                                  color: "white",
                                  transition: "0.3s",
                                  transform: "translateX(-50%) rotate(180deg)",
                                },
                              }}
                              onClick={() => handleRemoveFromCompare(watch.id)}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="subtitle1">
                            {watch.name}
                          </Typography>
                          <Button
                            onClick={() =>
                              dispatch(addToCart({ id: watch.id, quantity: 1 }))
                            }
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                              borderRadius: 10,
                              backgroundColor: "#0088ff",
                              fontWeight: "bold",
                              textTransform: "none",
                              "&:hover": {
                                backgroundColor: "black",
                              },
                            }}
                          >
                            {t("addToCart")}
                          </Button>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("price")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {watch.originalPrice && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  textDecoration: "line-through",
                                  mr: 1,
                                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                }}
                              >
                                ${watch.originalPrice.toFixed(2)}
                              </Typography>
                            )}
                            <Typography
                              variant="h6"
                              color="text.primary"
                              sx={{
                                fontWeight: "bold",
                                fontSize: {
                                  xs: "1.1rem",
                                  sm: "1rem",
                                  md: "1rem",
                                },
                              }}
                            >
                              ${watch.price.toFixed(2)}
                            </Typography>
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("rating")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <Rating value={watch.rating} readOnly />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("description")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <Typography>{watch.description}</Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("sku")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.sku}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("availability")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            <Check size={16} color="green" />

                            {watch.availability}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("individualSale")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          <X size={16} color="red" />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("weight")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.weight}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("length")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.length}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("height")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.height}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("width")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.width}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("productYear")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.productYear}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("productManual")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          {watch.productManual}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>{t("refundable")}</TableCell>
                      {comparedItems.map((watch, index) => (
                        <TableCell key={index} align="center">
                          Up to 14 days
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box> */}
        </div>
      ) : (
        <div> {t("backToHome")}</div>
      )}
    </div>
  );
};

export default ComparePage;
