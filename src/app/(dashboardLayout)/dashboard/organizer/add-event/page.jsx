"use client";
import DashboardHeading from "@/components/DashboardHeading";
import {
  CardHeader,
  Input,
  SelectIndicator,
  SelectPopover,
  Select,
  SelectTrigger,
  SelectValue,
} from "@heroui/react";
import { ListBox } from "@heroui/react";
import { Card } from "@heroui/react";
import { Form } from "@heroui/react";
import { ListBoxItem } from "@heroui/react";
import { TextArea } from "@heroui/react";
import { Button } from "@heroui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const AddEventPage = () => {
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

  // React hook form for form validation---------------------------------
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Handle form submission--------------------------------------------
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <DashboardHeading
        title="Create New Event"
        description={
          <>
            Launch a new <span className="text-pink-400/80">experience</span> •{" "}
            configure <span className="text-pink-400/80">ticketing</span> • set{" "}
            <span className="text-pink-400/80">schedule</span> • manage{" "}
            <span className="text-pink-400/80">lineup</span>
          </>
        }
      />

      {/* Your Event Form Components Will Go Here */}
      <div className="mt-6 max-w-3xl mx-auto">
        <Card
          className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-white">Host a New Event</h3>
            <p className="text-slate-400 text-xs">
              Fill out the detailed event information. Banners and dates are
              required.
            </p>
          </CardHeader>
          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-1 w-full">
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
                  <Input
                    {...register("banner", {
                      required: "Banner image URL is required",
                    })}
                    label="Banner Image URL"
                    labelPlacement="outside"
                    placeholder="https://images.unsplash.com/..."
                    isInvalid={!!errors.banner}
                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                  />
                  {errors.banner && (
                    <p className="text-red-400 text-xs">
                      {errors.banner.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        id="event-category"
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
                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: "Location is required" }}
                    render={({ field }) => (
                      <Select
                        id="event-location"
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <Input
                    {...register("date", { required: "Date is required" })}
                    id="event-date"
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
                  <Input
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" },
                    })}
                    id="event-price"
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
                  <Input
                    {...register("seats", {
                      required: "Capacity is required",
                      min: { value: 1, message: "Capacity must be at least 1" },
                    })}
                    id="event-seats"
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
              <div className="flex flex-col gap-1 w-full">
                <TextArea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  id="event-desc"
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
              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                radius="lg"
              >
                Host Event Now
              </Button>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddEventPage;
