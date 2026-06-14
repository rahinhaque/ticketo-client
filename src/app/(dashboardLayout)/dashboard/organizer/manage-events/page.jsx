"use client";
import DashboardHeading from "@/components/DashboardHeading";
import { deleteEvents, updateEvent } from "@/lib/api/events/action";
import getEvents from "@/lib/api/events/data";

import { useSession } from "@/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";

import {
  Card,
  Table,
  Chip,
  Spinner,
  TableBody,
  TableCell,
  TableColumn,
  TableContent,
  TableHeader,
  TableRow,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectIndicator,
  SelectPopover,
  ListBox,
  ListBoxItem,
  TextArea,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Pencil, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { toast } from "sonner";

const CATEGORIES = [
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Business",
  "Food",
  "Other",
];
const LOCATIONS = [
  "New York",
  "San Francisco",
  "London",
  "Dhaka",
  "Tokyo",
  "Berlin",
  "Online",
];

const ManageEventPage = () => {
  const { data: session } = useSession();

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const eventData = await getEvents(session?.user?.email);
      setEvents(eventData);
      setIsLoading(false);
    };
    loadEvents();
  }, [session]);

  // Pre-populate form when an event is selected for editing
  useEffect(() => {
    if (editingEvent) {
      reset({
        title: editingEvent.title || "",
        category: editingEvent.category || "",
        location: editingEvent.location || "",
        date: editingEvent.date
          ? new Date(editingEvent.date).toISOString().split("T")[0]
          : "",
        price: editingEvent.price ?? editingEvent.ticketPrice ?? "",
        seats: editingEvent.seats || "",
        description: editingEvent.description || "",
        banner: undefined,
      });
    }
  }, [editingEvent, reset]);

  const getStatusColor = (status) => {
    return status === "approved"
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : status === "rejected"
        ? "bg-red-500/10 text-red-400 border-red-500/20"
        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  };


  //Modal open and close
  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    reset();
  };

  //Handle form submission of edit and delete
  const onEditSubmit = async (data) => {
    // console.log("Edit event:", data);
    // ✅ Fix
    const updataData = { ...data };
    delete updataData.banner; // remove the FileList from the payload by default

    if (data?.banner?.[0]) {
      const imageUrl = await uploadImage(data.banner[0]);
      updataData.banner = imageUrl;
    } else {
      updataData.banner = editingEvent.banner; // keep existing banner
    }

    const resData = await updateEvent(updataData, editingEvent._id);
    if (resData.modifiedCount > 0) {
      toast.success("Event updated successfully!");

      // ✅ Patch the local state so the table updates instantly
      setEvents((prev) =>
        prev.map((e) =>
          e._id === editingEvent._id ? { ...e, ...updataData } : e,
        ),
      );
      handleCloseModal();
    }
  };;

  const handleDelete = (eventId) => {
    deleteEvents(eventId);
    toast.success("Event deleted successfully!");
    setEvents((prev) => prev.filter((e) => e._id !== eventId));
  };

  return (
    <div>
      <DashboardHeading
        title="Manage Events"
        description={
          <>
            Track live <span className="text-pink-400/80">analytics</span> •{" "}
            monitor <span className="text-pink-400/80">ticket sales</span> •{" "}
            update <span className="text-pink-400/80">details</span> • view{" "}
            <span className="text-pink-400/80">attendees</span>
          </>
        }
      />

      <div className="mt-6">
        <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-6 rounded-2xl">
          <div className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spinner
                  size="lg"
                  color="secondary"
                  label="Loading events..."
                />
              </div>
            ) : (
              <Table aria-label="Manage Events Table" removeWrapper>
                <TableContent>
                  <TableHeader className="bg-slate-950/40 border-b border-white/5 rounded-t-xl">
                    <TableColumn
                      className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20"
                      isRowHeader
                    >
                      EVENT
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      CATEGORY
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      DATE
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      TICKET PRICE
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      AVAILABLE SEATS
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      STATUS
                    </TableColumn>
                    <TableColumn className="py-4 px-6 text-slate-400 font-extrabold uppercase text-[11px] tracking-wider border-b border-white/5 bg-slate-950/20">
                      ACTIONS
                    </TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="No events found">
                    {events?.map((event) => (
                      <TableRow
                        key={event._id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                      >
                        <TableCell className="py-4 px-6 align-middle font-bold text-white">
                          <span className="line-clamp-1 truncate max-w-[150px]">
                            {event.title}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.category}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.date
                            ? new Date(event.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle font-semibold text-green-400">
                          {event.ticketPrice === 0 ? "Free" : `$${event.price}`}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle text-slate-300 font-medium">
                          {event.seats}
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle">
                          <Chip
                            size="sm"
                            className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${getStatusColor(event.status)}`}
                          >
                            {event.status || "pending"}
                          </Chip>
                        </TableCell>
                        <TableCell className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(event)}
                              className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors duration-150"
                              aria-label="Edit event"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(event._id)}
                              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors duration-150"
                              aria-label="Delete event"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </TableContent>
              </Table>
            )}
          </div>
        </Card>
      </div>

      {/* ── Edit Event Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseModal}
          />

          {/* Modal Panel */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <div>
                <h3 className="text-xl font-bold text-white">Edit Event</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Update the details below. Leave the banner field empty to keep
                  the existing image.
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6">
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="space-y-4 w-full"
              >
                {/* Row 1 – Title & Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-slate-400">
                      Event Title
                    </label>
                    <Input
                      {...register("title", {
                        required: "Event title is required",
                      })}
                      label="Event Title"
                      labelPlacement="outside"
                      placeholder="e.g. Rock Fest 2026"
                      isInvalid={!!errors.title}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                    {errors.title && (
                      <p className="text-red-400 text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-slate-400">
                      Banner Image{" "}
                      <span className="text-slate-500">
                        (leave blank to keep current)
                      </span>
                    </label>
                    <Input
                      {...register("banner")}
                      type="file"
                      accept="image/*"
                      labelPlacement="outside"
                      startContent={
                        <FaImage className="text-slate-400 text-sm" />
                      }
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                  </div>
                </div>

                {/* Row 2 – Category & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-slate-400">Category</label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "Category is required" }}
                      render={({ field }) => (
                        <Select
                          aria-label="Category"
                          placeholder="Select Category"
                          className="w-full"
                          selectedKey={field.value}
                          onSelectionChange={field.onChange}
                        >
                          <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                            <SelectValue />
                            <SelectIndicator />
                          </SelectTrigger>
                          <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px]">
                            <ListBox className="outline-none">
                              {CATEGORIES.map((cat) => (
                                <ListBoxItem
                                  key={cat}
                                  id={cat}
                                  textValue={cat}
                                  className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                                >
                                  {cat}
                                </ListBoxItem>
                              ))}
                            </ListBox>
                          </SelectPopover>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-red-400 text-xs">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-slate-400">Location</label>
                    <Controller
                      name="location"
                      control={control}
                      rules={{ required: "Location is required" }}
                      render={({ field }) => (
                        <Select
                          aria-label="Location"
                          placeholder="Select Location"
                          className="w-full"
                          selectedKey={field.value}
                          onSelectionChange={field.onChange}
                        >
                          <SelectTrigger className="w-full flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                            <SelectValue />
                            <SelectIndicator />
                          </SelectTrigger>
                          <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[200px]">
                            <ListBox className="outline-none">
                              {LOCATIONS.map((loc) => (
                                <ListBoxItem
                                  key={loc}
                                  id={loc}
                                  textValue={loc}
                                  className="p-2 text-white hover:bg-pink-500/20 rounded-lg cursor-pointer"
                                >
                                  {loc}
                                </ListBoxItem>
                              ))}
                            </ListBox>
                          </SelectPopover>
                        </Select>
                      )}
                    />
                    {errors.location && (
                      <p className="text-red-400 text-xs">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3 – Date, Price, Seats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-slate-400">Date</label>
                    <Input
                      {...register("date", { required: "Date is required" })}
                      type="date"
                      label="Date"
                      labelPlacement="outside"
                      isInvalid={!!errors.date}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                    {errors.date && (
                      <p className="text-red-400 text-xs">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-slate-400">Price</label>
                    <Input
                      {...register("price", {
                        required: "Price is required",
                        min: { value: 0, message: "Price cannot be negative" },
                      })}
                      type="number"
                      min={0}
                      step="any"
                      label="Ticket Price ($)"
                      labelPlacement="outside"
                      placeholder="0.00"
                      isInvalid={!!errors.price}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                    {errors.price && (
                      <p className="text-red-400 text-xs">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-xs text-slate-400">Capacity</label>
                    <Input
                      {...register("seats", {
                        required: "Capacity is required",
                        min: {
                          value: 1,
                          message: "Capacity must be at least 1",
                        },
                      })}
                      type="number"
                      min={1}
                      label="Available Capacity"
                      labelPlacement="outside"
                      placeholder="100"
                      isInvalid={!!errors.seats}
                      className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                    />
                    {errors.seats && (
                      <p className="text-red-400 text-xs">
                        {errors.seats.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs text-slate-400">Description</label>
                  <TextArea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    label="Detailed Description"
                    labelPlacement="outside"
                    placeholder="Outline the detailed schedule, speaker list, and amenities..."
                    isInvalid={!!errors.description}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[120px] text-white text-sm"
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="h-11 px-5 rounded-xl border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                    radius="lg"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEventPage;
