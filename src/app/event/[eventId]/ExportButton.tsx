"use client";

import { useState } from "react";
import { User } from "~/types";

export function ExportButton(props: { eventName: string; attendees: User[] }) {
  const [loading, setLoading] = useState(false);
  const [checkMark, setCheckMark] = useState(false);

  async function exportTableAsCSV() {
    setLoading(true);
    const csvRows = [];
    const headers = ["Name", "LinkedIn", "Twitter"];

    // Add headers to CSV rows
    csvRows.push(headers.join(","));

    // Add attendee data to CSV rows
    props.attendees.forEach((attendee) => {
      const row = [
        attendee.name,
        attendee.linkedin_handle ?? "",
        attendee.twitter_handle ?? "",
      ];
      csvRows.push(row.join(","));
    });

    // Create CSV content
    const csvContent = csvRows.join("\n");

    // Create a Blob object with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary anchor element to download the CSV file
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = props.eventName + " attendees.csv";

    // Programmatically click the anchor element to trigger the download
    setTimeout(() => {
      setLoading(false);
      setCheckMark(true);
      link.click();
    }, 1500);

    setTimeout(() => {
      setCheckMark(false);
    }, 4000);
  }

  return (
    <button className="btn btn-neutral bg-text" onClick={exportTableAsCSV}>
      Export as CSV
      {loading && <span className="loading loading-sm ml-2"></span>}
      {checkMark && <span>&#10003;</span>}
    </button>
  );
}
