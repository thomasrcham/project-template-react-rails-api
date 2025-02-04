class VolunteersController < ApplicationController
  def index
    render json: Volunteer.all, status: :ok
  end

  def show
    volunteer = Volunteer.find(params[:id])
    render json: volunteer, status: :ok
  end

  def user
    volunteer = Volunteer.find_by(user_id: params[:id])
    render json: volunteer,
           serializer: VolunteerWithActivitiesSerializer,
           status: :ok
  end

  # def create
  #   volunteer = Volunteer.create!(name: params[:name], age: params[:age], email: params[:email], user_id: User.create!(user_params).id)
  #   render json: volunteer, status: :created
  # end

  def create
    byebug
    user= User.create!(user_params)
    volunteer = Volunteer.create!(volunteer_params, user_id: 
      user.id)
    render json: volunteer, status: :created
  end

  def update
    volunteer = Volunteer.find(params[:id])
    volunteer.update!(volunteer_params)
    render json: volunteer, status: :accepted
  end

  def destroy
    volunteer = Volunteer.find(params[:id])
    volunteer.destroy
    render json: {}, status: :ok
  end

  private

  def volunteer_params
    params.permit(:name, :age, :email)
  end

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
