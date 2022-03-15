import { useAppDispatch } from "../../../../../redux/hooks";
import React, { useState } from "react";
import { colors, font, gap, radius, shadow } from "../../../../../theme/variables";
import { SET_OVERLAY_STATE } from "../../../../../redux/action-types";
import { PlusIcon } from "../../../../../components/icons";
import { UnderlineInput } from "../../../../../components/Input";
import { BasicButton } from "../../../../../components/buttons";

export default function FooterForm() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orgNr, setOrgNr] = useState<string>("");
  const style = {
    container: {
      backgroundColor: colors.white,
      borderRadius: radius.small,
      boxShadow: shadow.defaultBox,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: gap.medium,
      color: colors.darkGray,
      fontSize: font.size.large,
      fontWeight: font.weight.thin,
      cursor: isOpen ? "" : "pointer"
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: gap.small
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginTop: gap.medium,
      gap: gap.medium,
      buttonContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: gap.small,
        width: "100%"
      }
    }
  };

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isOpen) setIsOpen(true);
  };
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isOpen) setIsOpen(false);
  };
  const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
    setOrgNr(event.currentTarget.value);
  };
  const handleAddCompany = async () => {
    dispatch({ type: SET_OVERLAY_STATE, payload: 1 });
  };
  return (
    <div style={style.container} onClick={handleAddCompany}>
      <div style={style.header}>
        Add Company
        <PlusIcon height={13} width={13} color={colors.darkGray} />
      </div>
      {/* TODO: All the services for fetching data about a company through their orgNr costs money.
          Wait for greenlight until we start using it.
          For now, we just go to the overlay the second we press Add Company */}
      {isOpen ? (
        <form style={style.form}>
          <UnderlineInput placeholder="org nr." isRequired onKeyUp={handleChange} />
          <div style={style.form.buttonContainer}>
            <BasicButton
              style={{ flex: 1 }}
              color={colors.white}
              onClick={handleAddCompany}
              backgroundColor={colors.darkGray}
            >
              Add
            </BasicButton>
            <BasicButton color={colors.white} onClick={handleClose} backgroundColor={colors.red}>
              Close
            </BasicButton>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}
